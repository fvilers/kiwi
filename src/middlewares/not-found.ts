import { NextFunction, Request, RequestHandler, Response } from "express";
import { NotFound } from "http-errors";

export function notFound(): RequestHandler {
  return function (_req: Request, _res: Response, next: NextFunction) {
    next(new NotFound());
  };
}
