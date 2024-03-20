import express from "express";
import "express-async-errors";
import compression from "compression";
import config from "./src/config/index.js";
import rateLimitMiddleware from "./src/middleware/ratelimit.js";
import securityMiddleware from "./src/middleware/security.js";
import httpLoggerMiddleware from "./src/middleware/httpLogger.js";
import { errorHandlingMiddleware } from "./src/middleware/errors/index.js";

/** Configured server application */
const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the number of trusted proxies
app.set("trust proxy", config.server.proxies.max_trusted);

// Http logger
httpLoggerMiddleware(app);

// Rate limiter
rateLimitMiddleware(app);

// Security
securityMiddleware(app);

// Error Handling
errorHandlingMiddleware(app);

export default app;
