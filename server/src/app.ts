import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

export default app;
