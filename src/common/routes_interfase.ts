import { NextFunction, Router, Request, Response} from "express";

export interface IControllerRoute {
  method : keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
}
export type ExpressReutrnType = Response<any, Record<string, any>>;