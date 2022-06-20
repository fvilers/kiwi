import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { mapUrlToLocalFile } from "./middlewares/map-url-to-local-file";
import { markdown } from "./middlewares/markdown";
import { notFound } from "./middlewares/not-found";

export const app = express();

app.use(mapUrlToLocalFile());
app.use(markdown());
app.use("*", notFound());
app.use(errorHandler());
