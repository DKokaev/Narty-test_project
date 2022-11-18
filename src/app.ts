import express, { Express } from 'express';
import { Server } from 'http';
import('reflect-metadata');
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger_interface';
import { ExeptionFilter } from './errors/exeption_filter';
import { ComicsController } from './methods/comics_controller';
// import { DatabaseConnection } from './database/db';

@injectable()
export class App {
	server: Server;
	app: Express;
	port: number;
	host: String;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		@inject(TYPES.IComicsController) private comicsController: ComicsController, // @inject(TYPES.Database) private database: DatabaseConnection,
	) {
		this.app = express();
		this.port = 6000;
		this.host = 'localhost';
	}
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	ComicsList(): void {
		this.app.use('/comics', this.comicsController.router);
	}
	public async init(): Promise<void> {
		this.ComicsList();
		this.useExeptionFilters();
		// await this.database.DbConnections();
		this.server = this.app.listen(this.port);
		this.logger.log(`This server is running on  https://localhosh:${this.port}`);
	}
}
