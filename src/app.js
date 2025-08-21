import express from "express";
import cors from "cors";

const app = express();

// Basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Enable CORS for all routes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Autohorization"],
  }),
);

// Import routes
import healthCheckRouter from "./routes/healthCheck.route.js";

// Use routes
app.use("/api/v1/healthcheck", healthCheckRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the project Management Application!");
});

export default app;
