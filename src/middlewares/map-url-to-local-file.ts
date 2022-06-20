import { NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";
import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

// TODO: this could be a configuration setting
const DEFAULT_PATH = "pages";

export function mapUrlToLocalFile() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const localFile = path.join(
      process.cwd(),
      DEFAULT_PATH,
      mapToLocal(req.path)
    );
    const fileExists = await exists(localFile);

    if (!fileExists) {
      next(new NotFound());
    }

    req.url = localFile;

    next();
  };
}

function mapToLocal(requestPath: string): string {
  if (requestPath === "/") {
    return "/index.md";
  }

  if (!requestPath.endsWith(".md")) {
    return requestPath + ".md";
  }

  return requestPath;
}

async function exists(filename: string): Promise<boolean> {
  try {
    await fs.access(filename, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
