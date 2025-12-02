import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Password for accessing the site - can be changed here
const SITE_PASSWORD = process.env.SITE_PASSWORD || "iloveyou";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Password verification endpoint
  app.post("/api/verify-password", (req, res) => {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, message: "Password required" });
    }
    
    if (password === SITE_PASSWORD) {
      // Set a session flag for authenticated access
      req.session.isAuthenticated = true;
      return res.json({ success: true });
    }
    
    return res.status(401).json({ success: false, message: "Incorrect password" });
  });

  // Check if user is authenticated
  app.get("/api/check-auth", (req, res) => {
    return res.json({ isAuthenticated: !!req.session.isAuthenticated });
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.isAuthenticated = false;
    return res.json({ success: true });
  });

  return httpServer;
}
