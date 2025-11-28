import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { generateChatResponse } from "./openai";
import { searchSchemes, governmentSchemes, getSchemeById, getSchemesByCategory } from "./schemes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Chat endpoint - main RAG-powered conversation
  app.post("/api/chat", async (req, res) => {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.issues,
        });
      }

      const { message, conversationHistory } = validationResult.data;

      const response = await generateChatResponse(
        message,
        conversationHistory?.map((m) => ({
          role: m.role,
          content: m.content,
        }))
      );

      return res.json(response);
    } catch (error) {
      console.error("Chat error:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to process chat request",
      });
    }
  });

  // Get all schemes
  app.get("/api/schemes", async (req, res) => {
    try {
      const { category, limit } = req.query;
      
      let schemes = governmentSchemes;
      
      if (category && typeof category === "string") {
        schemes = getSchemesByCategory(category);
      }
      
      if (limit && typeof limit === "string") {
        const limitNum = parseInt(limit, 10);
        if (!isNaN(limitNum) && limitNum > 0) {
          schemes = schemes.slice(0, limitNum);
        }
      }
      
      return res.json({ schemes });
    } catch (error) {
      console.error("Get schemes error:", error);
      return res.status(500).json({ error: "Failed to fetch schemes" });
    }
  });

  // Get single scheme by ID
  app.get("/api/schemes/:id", async (req, res) => {
    try {
      const scheme = getSchemeById(req.params.id);
      
      if (!scheme) {
        return res.status(404).json({ error: "Scheme not found" });
      }
      
      return res.json({ scheme });
    } catch (error) {
      console.error("Get scheme error:", error);
      return res.status(500).json({ error: "Failed to fetch scheme" });
    }
  });

  // Search schemes
  app.get("/api/search", async (req, res) => {
    try {
      const { q, limit } = req.query;
      
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const limitNum = limit && typeof limit === "string" ? parseInt(limit, 10) : 5;
      const schemes = searchSchemes(q, limitNum);
      
      return res.json({ schemes, query: q });
    } catch (error) {
      console.error("Search error:", error);
      return res.status(500).json({ error: "Failed to search schemes" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", schemesLoaded: governmentSchemes.length });
  });

  return httpServer;
}
