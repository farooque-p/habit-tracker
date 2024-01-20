import express from "express";
import cors from "cors";
const app = express();

//Middleware
app.use(
  cors({
    origin: process.env.CCORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Import Routes
import habitRouter from "./routes/habit.routes.js";

app.use("/api/v1/habits", habitRouter);

export default app;
