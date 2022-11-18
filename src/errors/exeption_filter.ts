import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger_interface';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption_filter_interface';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error, req: Request, res: Response, next: NextFunction): void {
		if (err) {
			this.logger.error(err);
			res.send({ err: err.message });
		} else {
			this.logger.error(`${err}`);
			res.status(500).send({ err: err });
		}
	}
}
