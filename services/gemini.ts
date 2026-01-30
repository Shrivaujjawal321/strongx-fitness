
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateWorkoutPlan(goal: string, fitnessLevel: string, equipment: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a personalized fitness plan for someone with the following profile:
          Goal: ${goal}
          Fitness Level: ${fitnessLevel}
          Equipment Available: ${equipment}
          
          Provide the plan in JSON format with exercise names, sets, reps, and a brief tip for each.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              planName: { type: Type.STRING },
              summary: { type: Type.STRING },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    sets: { type: Type.NUMBER },
                    reps: { type: Type.STRING },
                    tip: { type: Type.STRING }
                  },
                  required: ["name", "sets", "reps", "tip"]
                }
              }
            },
            required: ["planName", "summary", "exercises"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }

  async getAiMotivation() {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Give me one short, powerful, aggressive fitness motivation quote for a high-end gym brand called StrongX. Keep it under 15 words.",
      });
      return response.text.trim();
    } catch (error) {
      return "TRANSFORM BODY AND MIND AT STRONGX.";
    }
  }
}

export const gemini = new GeminiService();
