import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { BaseController } from '../common/base_controller';
import { ILogger } from '../logger/logger_interface';
import { DbConnections } from '../database/db';
// import { ComicsOptions } from './comics_options';
import fetch from 'node-fetch';
// import { DatabaseConnection } from '../database/db';
// import { feedbackDto } from './dto/feedback_dto';

@injectable()
export class ComicsController extends BaseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger, // @inject(TYPES.Database) private database: DatabaseConnection,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				method: 'get',
				path: '/list',
				func: this.comicsList,
			},
			// {
			// 	method: 'get',
			// 	path: '/list',
			// 	func: this.comicsList,
			// },
			// {
			// 	method: 'get',
			// 	path: '/id',
			// 	func: this.comicsId,
			// },
			// {
			// 	method: 'get',
			// 	path: '/lang',
			// 	func: this.langList,
			// },
			// {
			// 	method: 'get',
			// 	path: '/sns',
			// 	func: this.sns,
			// },
			// {
			// 	method: 'post',
			// 	path: '/feedback',
			// 	func: this.feedback,
			// },
		]);
	}
	async comicsList(req: Request, res: Response, next: NextFunction): Promise<void> {
		DbConnections();
	}
	// async comicsList(req: Request, res: Response, next: NextFunction): Promise<void> {
	// 	// console.log('ffffffffff')
	// 	const url = `https://${ComicsOptions.hostname}${ComicsOptions.comisclist.path}`;
	// 	const result = await fetch(url);
	// 	const body = await result.json();
	// 	// console.log(url)
	// 	// console.log(body.data);
	// 	res.send(body.data);
	// }
	// async comicsId(req: Request, res: Response, next: NextFunction): Promise<void> {
	// 	// console.log('fffffffffff')
	// 	const id = 1;
	// 	const url = `https://${ComicsOptions.hostname}${ComicsOptions.comicsId.path}`;
	// 	const result = await fetch(url);
	// 	const body = await result.json();
	// 	// console.log(url)
	// 	// console.log(body);
	// 	res.send(body);
	// }
	// async sns(req: Request, res: Response, next: NextFunction): Promise<void> {
	// 	const url = `https://${ComicsOptions.hostname}${ComicsOptions.sns.path}`;
	// 	const result = await fetch(url);
	// 	const body = await result.json();
	// 	// console.log(url)
	// 	// console.log(body);
	// 	res.send(body);
	// }
	// async langList(req: Request, res: Response, next: NextFunction): Promise<void> {
	// 	const url = `https://${ComicsOptions.hostname}${ComicsOptions.langList.path}`;
	// 	const result = await fetch(url);
	// 	const body = await result.json();
	// 	// console.log(url)
	// 	// console.log(body);
	// 	res.send(body);
	// 	next();
	// }
	// async feedback(
	// 	req: Request<{}, {}, feedbackDto>,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	const url = `https://${ComicsOptions.hostname}${ComicsOptions.feedback.path}`;
	// 	const result = await fetch(url, {});
	// 	const data = await result.json();
	// 	// console.log(url)
	// 	// console.log(body);
	// 	res.send(data);
	// 	next();
	// }
}
