import { NextFunction, Request, Response } from 'express';

export interface IComicsController {
	comicsList: (req: Request, res: Response, next: NextFunction) => void;
	allPagesList: (req: Request, res: Response, next: NextFunction) => void;
	languages: (req: Request, res: Response, next: NextFunction) => void;
}
