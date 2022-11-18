import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import { ILogger } from './logger/logger_interface';
import { LoggerService } from './logger/logger_service';
import { IExeptionFilter } from './errors/exeption_filter_interface';
import { ExeptionFilter } from './errors/exeption_filter';
import { ComicsController } from './methods/comics_controller';
// import { DatabaseConnection } from './database/db';
// import { DirestoriesServise } from './database/directories_service';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<ComicsController>(TYPES.IComicsController).to(ComicsController).inSingletonScope();
	// bind<DatabaseConnection>(TYPES.Database).to(DatabaseConnection).inSingletonScope();
	// bind<DirestoriesServise>(TYPES.DirestoriesServise).to(DirestoriesServise).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}
export const { app, appContainer } = bootstrap();
