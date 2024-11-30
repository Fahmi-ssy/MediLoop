import database from "../config/mongodb";

class OpenAiModel {
    id?: string;
    model?: string;
    messages: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
        timestamp: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    totalTokens?: number;
    temperature?: number;
    maxTokens?: number;

    constructor() {
        this.messages = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
class AiModel {
    static collection() {
      return database.collection<OpenAiModel>("openai");
    }
}