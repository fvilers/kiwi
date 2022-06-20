import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { notFound } from "./middlewares/not-found";

export const app = express();

app.use(mapUrlToLocalFile());
app.use("*", notFound());
app.use(errorHandler());
