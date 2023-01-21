import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { IExeptionFilter } from './errors/exeption_filter_interface';
import { ExeptionFilter } from './errors/exeption_filter';
import { IComicsController } from './methods/comics.controller.interface';
import { ComicsController } from './methods/comics.constroller';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IComicsController>(TYPES.IComicsController).to(ComicsController).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}
export const { app, appContainer } = bootstrap();
