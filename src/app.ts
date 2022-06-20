import express from "express";
import { errorHandler } from "./middlewares/error-handler";

export const app = express();

app.use(errorHandler());
