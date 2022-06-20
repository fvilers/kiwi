import express from "express";
import path from "node:path";
import { errorHandler } from "./middlewares/error-handler";
import { mapUrlToLocalFile } from "./middlewares/map-url-to-local-file";
import { markdown } from "./middlewares/markdown";
import { notFound } from "./middlewares/not-found";

export const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(mapUrlToLocalFile());
app.use(markdown());
app.use("*", notFound());
app.use(errorHandler());
