import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ANLOCKS_PRODUCTS } from "../constants";
import { RecipeResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "Name of the dish, sounding authentic and delicious." },
    ingredients: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of ingredients with approximate quantities" 
    },
    instructions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Step by step cooking instructions, clearly numbered."
    },
    recommendedAnlocksProduct: { 
      type: Type.STRING, 
      description: "The EXACT name of one Anlocks product from the provided list that pairs best." 
    },
    reasonForRecommendation: { 
      type: Type.STRING, 
      description: "A compelling reason why this specific pickle or chutney elevates the dish (e.g., 'The tanginess of the Mango Pickle cuts through the richness...')." 
    },
    cookingTime: { type: Type.STRING, description: "Total cooking time e.g., '30 mins'" },
    difficulty: { type: Type.STRING, description: "Difficulty level: Easy, Medium, or Hard" }
  },
  required: ["recipeName", "ingredients", "instructions", "recommendedAnlocksProduct", "reasonForRecommendation", "cookingTime", "difficulty"]
};

export const generateRecipe = async (selectedIngredients: string[]): Promise<RecipeResult | null> => {
  try {
    const productNames = ANLOCKS_PRODUCTS.map(p => p.name).join(", ");
    
    const prompt = `
      Act as a master chef for 'Anlocks', a premium Indian pickle and chutney brand.
      
      The customer has these ingredients available: ${selectedIngredients.join(", ")}.
      
      Your task:
      1. Create a delicious, home-style Indian recipe using the available ingredients.
      2. CRITICAL: Pair this dish with one specific Anlocks product from this list: [${productNames}].
      3. If the ingredients allow (e.g., rice, flour), you can suggest the pickle as a side. If the ingredients are specific (e.g., paneer, chicken), suggest using the pickle/chutney IN the marinade or as a perfect accompaniment.
      4. Assume basic pantry staples (oil, salt, turmeric, chili powder, water) are available.
      
      Make the output tempting and emphasize how the Anlocks product completes the meal.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        systemInstruction: "You are the Anlocks AI Culinary Expert. You love traditional Indian flavors and believe a meal is incomplete without a spoonful of Anlocks pickle."
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as RecipeResult;

  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};