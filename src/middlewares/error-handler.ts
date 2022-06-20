import logger from "@fvilers/simple-logger";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function errorHandler(): ErrorRequestHandler {
  return function (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { code, message, stack, status } = err;

    logger.error(stack);
    res.status(status || 500).send({ code, message, stack });
  };
}
