import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IComicsController } from './comics.controller.interface';
import fs from 'fs';

import {
	get_allPages,
	dropComics_row,
	get_comics,
	get_languages,
	get_pages,
	insert_into_comm,
	insert_into_page,
	get_comicsForId,
} from '../database/db';
import { UploadedFile } from 'express-fileupload';
import { HTTPError } from '../errors/http_error';

export const notes = 'notes/';

@injectable()
export class ComicsController extends BaseController implements IComicsController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{
				method: 'get',
				path: '/list',
				func: this.comicsList,
			},
			{
				method: 'get',
				path: '/lang',
				func: this.languages,
			},
			{
				method: 'get',
				path: '/all_pages',
				func: this.allPagesList,
			},
			{
				method: 'post',
				path: '/create',
				func: this.insertComm,
			},
			{
				method: 'post',
				path: '/drop_comm',
				func: this.comm_drop,
			},
			{
				method: 'post',
				path: '/create-page',
				func: this.insertPage,
			},
			{
				method: 'get',
				path: '/id?',
				func: this.comicsForId,
			},
		]);
	}

	async comicsList(req: Request, res: Response, next: NextFunction): Promise<any> {
		const data = await get_comics().then(async (comics: any) => {
			const pages = await comics.map(async (item: any) => {
				item.page = await get_pages(item.id);
				// console.log('item: ', item);
				// console.log(item);
				return await item;
			});
			return pages;
		});
		if (!data) {
			return next(new HTTPError(500, 'Произошла ошибка на стороне сервера ', 'list'));
		}
		const total = Promise.all(data).then((val: any) => {
			res.json(val);
		});
	}

	async languages(req: Request, res: Response): Promise<any> {
		const data = await get_languages().then(async (languages: any) => {
			const lang = languages.map(async (item: any) => {
				return await item;
			});
			return await lang;
		});
		const total = Promise.all(data).then((val: any) => {
			res.json(val);
		});
	}

	async allPagesList(req: Request, res: Response): Promise<any> {
		const data = await get_allPages();
		res.json(data);
	}

	async insertComm(req: Request, res: Response): Promise<void> {
		const dir = `${notes}${req.body.id}`;
		fs.mkdir(dir, (err) => {
			if (err) {
				throw err;
			}
			console.log('Directory is created.');
		});
		const image = req.files?.ico as UploadedFile;
		image?.mv(dir + '/' + image.name);
		console.log(dir + '/' + image.name);
		const run = await insert_into_comm(req.body, image.name, dir);
		res.json(req.body);
	}

	async comm_drop(req: Request, res: Response): Promise<any> {
		const dir = `${notes}${req.body.id}`;
		console.log(dir);
		fs.rmSync(dir, { recursive: true, force: true });
		const drop = await dropComics_row(req.body.id);
		res.send('k');
	}

	async insertPage(req: Request, res: Response): Promise<any> {
		const dir = req.body.comics_id;
		console.log(req.body);
		const image = req.files?.image as UploadedFile;
		image?.mv(notes + dir + '/' + image.name);
		// console.log(image, notes + image.name);
		const data = await insert_into_page(req.body, image.name);
		res.send(req.body);
	}

	async comicsForId(req: Request, res: Response): Promise<void> {
		console.log(req.query);
		const data = await get_comicsForId(req.query.id).then(async (comics: any) => {
			const pages = await get_pages(req.query.id);
			comics[0].pages = pages;
			return await comics;
		});

		const total = Promise.all(data).then((val: any) => {
			console.log(val);
			res.json(val);
		});
	}
}
