import { NextFunction, Request, Response } from 'express';

export interface IComicsController {
	comicsList: (eq: Request, res: Response, next: NextFunction) => void;
	comicsId: (req: Request, res: Response, next: NextFunction) => void;
}
