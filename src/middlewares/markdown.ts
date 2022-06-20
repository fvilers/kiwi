import { NextFunction, Request, Response } from "express";
import { marked } from "marked";
import fs from "node:fs/promises";
import { loadFront } from "yaml-front-matter";

export function markdown() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const buffer = await fs.readFile(req.url);
    const content = buffer.toString();
    const front = loadFront(content);

    // TODO: this could be a template
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${front.title}</title>
  </head>
  <body>
    ${marked.parse(front.__content)}
  </body>
</html>`;

    res.status(200).send(html);
  };
}
