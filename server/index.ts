import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory with increased limits for large files
app.use(express.static(path.join(process.cwd(), 'public'), {
  maxAge: '1d', // Cache for 1 day
  setHeaders: (res, path) => {
    // Set appropriate headers for video files
    if (path.endsWith('.mp4')) {
      res.set('Accept-Ranges', 'bytes'); // Enable partial content requests
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Set NODE_ENV to production if not already set in production environment
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'production';
    }

    const server = await registerRoutes(app);

    // Enhanced error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      // Log error details for debugging
      log(`Error ${status}: ${message}`);
      if (err.stack) {
        log(`Stack: ${err.stack}`);
      }

      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = process.env.PORT || 5000;
    
    // Enhanced server startup with proper error handling
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`Server successfully started on port ${port} in ${process.env.NODE_ENV} mode`);
      log(`Server is accessible at http://0.0.0.0:${port}`);
    });

    // Handle server startup errors
    server.on('error', (err: any) => {
      log(`Server startup error: ${err.message}`);
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is already in use`);
      } else if (err.code === 'EACCES') {
        log(`Permission denied to bind to port ${port}`);
      }
      process.exit(1);
    });

    // Handle process termination gracefully
    process.on('SIGTERM', () => {
      log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully');
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error: any) {
    log(`Failed to start server: ${error.message}`);
    if (error.stack) {
      log(`Stack: ${error.stack}`);
    }
    
    // Check for common startup issues
    if (error.message.includes('DATABASE_URL')) {
      log('Database connection failed - ensure DATABASE_URL environment variable is set');
    }
    if (error.message.includes('SENDGRID_API_KEY')) {
      log('SendGrid configuration failed - ensure SENDGRID_API_KEY environment variable is set');
    }
    
    process.exit(1);
  }
})();
