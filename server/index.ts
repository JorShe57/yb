import { createServer } from "http";
import { createApp } from "./app";
import { setupVite, serveStatic, log } from "./vite";

(async () => {
  try {
    // Set NODE_ENV to production if not already set in production environment
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'production';
    }

    const app = await createApp();
    const server = createServer(app);

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
    server.listen(Number(port), () => {
      log(`Server successfully started on port ${port} in ${process.env.NODE_ENV} mode`);
      log(`Server is accessible at http://localhost:${port}`);
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
    if (error.message.includes("N8N_WEBHOOK_URL")) {
      log("n8n webhook failed - ensure N8N_WEBHOOK_URL environment variable is set and reachable");
    }
    
    process.exit(1);
  }
})();
