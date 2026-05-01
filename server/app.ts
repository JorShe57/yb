import express, { type Express, type Request, type Response, type NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { log } from "./vite";

export async function createApp(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Serve static files from the public directory with increased limits for large files
  // (Used for local/dev hosting; Vercel serves built assets separately.)
  app.use(
    express.static(path.join(process.cwd(), "public"), {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".mp4")) {
          res.set("Accept-Ranges", "bytes");
        }
      },
    }),
  );

  app.use((req, res, next) => {
    const start = Date.now();
    const reqPath = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (reqPath.startsWith("/api")) {
        let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app);

  // Enhanced error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error ${status}: ${message}`);
    if (err.stack) log(`Stack: ${err.stack}`);

    res.status(status).json({ message });
  });

  return app;
}

