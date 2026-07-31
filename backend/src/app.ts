import cors from "cors";
import express from "express";
import { recipeRouter } from "./routes/recipe.routes";

export function createApp() {
  const app = express();

  const corsOrigin = process.env.CORS_ORIGIN;
  app.use(
    cors({
      origin: corsOrigin ? corsOrigin.split(",").map((origin) => origin.trim()) : true,
    })
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/recipes", recipeRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  return app;
}
