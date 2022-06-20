import compression from "compression";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import path from "node:path";
import { errorHandler } from "./middlewares/error-handler";
import { mapUrlToLocalFile } from "./middlewares/map-url-to-local-file";
import { markdown } from "./middlewares/markdown";
import { notFound } from "./middlewares/not-found";

export const app = express();

app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(mapUrlToLocalFile(path.join(__dirname, "..", "pages")));
app.use(markdown(path.join(__dirname, "..", "layouts")));
app.use("*", notFound());
app.use(errorHandler());
