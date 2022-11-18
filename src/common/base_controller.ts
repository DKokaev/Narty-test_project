import { Router, Response } from 'express';
import { ILogger } from '../logger/logger_interface';
import { ExpressReutrnType, IControllerRoute } from './routes_interfase';
export { Router } from 'express';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReutrnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReutrnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReutrnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
