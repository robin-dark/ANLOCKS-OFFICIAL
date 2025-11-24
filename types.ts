export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

export interface RecipeResult {
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  recommendedAnlocksProduct: string;
  reasonForRecommendation: string;
  cookingTime: string;
  difficulty: string;
}