import { NextFunction, Request, Response } from "express";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";
import { loadFront } from "yaml-front-matter";

export function markdown(layoutPath: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const buffer = await fs.readFile(req.url);
    const content = buffer.toString();
    const front = loadFront(content);
    let layout = "#body#";

    try {
      layout = await getLayout(layoutPath, front.layout);
    } catch (e) {
      next(e);
      return;
    }

    const html = layout
      .replace("#title#", front.title)
      .replace("#body#", marked.parse(front.__content));

    res.status(200).send(html);
  };
}

async function getLayout(
  layoutPath: string,
  layoutName: string = "normal"
): Promise<string> {
  const buffer = await fs.readFile(path.join(layoutPath, layoutName + ".html"));

  return buffer.toString();
}
