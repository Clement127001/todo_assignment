import express from "express";

import health from "./router/health.js";
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import allowCrossDomain from "./middlewares/allow-cors.js";
import { basePath } from "./utils/common.js";
import authRouter from "./router/auth.js";
import todoRouter from "./router/todo.js";
import authMiddleware from "./middlewares/authentication.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allowCrossDomain);

app.get("/health", health);

app.use(basePath + "/auth", authRouter);
app.use(basePath + "/todo", authMiddleware, todoRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

export default app;
