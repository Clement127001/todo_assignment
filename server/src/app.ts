import express from "express";
import health from "./router/health.js";

const app = express();

app.use(express.json());
app.get("/health", health);

export default app;
