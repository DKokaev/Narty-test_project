import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import { Server } from 'http';
import('reflect-metadata');
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { ExeptionFilter } from './errors/exeption_filter';
import { ComicsController } from './methods/comics.constroller';
import cors from 'cors';
import bodyParser from 'body-parser';

@injectable()
export class App {
	server: Server;
	app: Express;
	port: number;
	host: String;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		@inject(TYPES.IComicsController) private comicsController: ComicsController,
	) {
		this.app = express();
		this.app.use(fileUpload());
		this.app.use(express.static('notes'));
		this.app.use(express.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.port = 8000;
		this.host = 'localhost';
		this.app.use(
			cors({
				origin: 'http://localhost:3000',
				methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			}),
		);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	ComicsList(): void {
		this.app.use('/comics', this.comicsController.router);
		// this.app.use(this.comicsController.router);
		// this.comicsController.comicsList();
	}
	public async init(): Promise<void> {
		this.ComicsList();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`This server is running on  https://localhost:${this.port}`);
	}
}
