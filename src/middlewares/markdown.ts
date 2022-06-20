import { NextFunction, Request, Response } from "express";
import { marked } from "marked";
import fs from "node:fs/promises";

export function markdown() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const buffer = await fs.readFile(req.url);
    const parsed = marked.parse(buffer.toString());

    res.status(200).send(parsed);
  };
}
