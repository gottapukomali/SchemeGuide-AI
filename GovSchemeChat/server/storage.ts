import type { Message } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for chat messages (in-memory for MVP)
export interface IStorage {
  getMessages(sessionId: string): Promise<Message[]>;
  addMessage(sessionId: string, message: Omit<Message, "id">): Promise<Message>;
  clearMessages(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, Message[]>;

  constructor() {
    this.sessions = new Map();
  }

  async getMessages(sessionId: string): Promise<Message[]> {
    return this.sessions.get(sessionId) || [];
  }

  async addMessage(sessionId: string, message: Omit<Message, "id">): Promise<Message> {
    const id = randomUUID();
    const newMessage: Message = { ...message, id };
    
    const existing = this.sessions.get(sessionId) || [];
    existing.push(newMessage);
    this.sessions.set(sessionId, existing);
    
    return newMessage;
  }

  async clearMessages(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}

export const storage = new MemStorage();
