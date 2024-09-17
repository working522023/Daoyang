import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Middleware imports
import { config } from "./config";
import { initializeRoutes } from "./routes";
import { errorHandler, requestLogger, globalRateLimit } from "./common";

// Set default timezone
process.env.TZ = config.timeZone;

// Initialize Express app
const app = express();

// Middleware setup
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Logging middleware
app.use(requestLogger);

// Apply global rate limiting
app.use(globalRateLimit);

// Routes setup
initializeRoutes(app);

// Handle 404 - Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: 404, message: "Resource not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
