import axios from "axios";

const isDevelopmentMode = import.meta.env.MODE === "development";
const origin = isDevelopmentMode ? "http://localhost:3000" : "";

const recipesApi = axios.create({
  baseURL: `${origin}/api/v1/recipes`,
});

export interface Recipe {
  name: string;
  ingredients: string[];
  instruction: string[];
}

export const getAllRecipes = async (searchQuery: string) => {
  if (!searchQuery) return;
  const res = await recipesApi.get(`?search=${searchQuery}`);
  return res.data;
};

export const getRecipe = async (idOrName: string) => {
  if (!idOrName) return;
  const res = await recipesApi.get(`/${idOrName}`);
  return res.data;
};

export const addRecipe = async (payload: Recipe) => {
  const res = await recipesApi.post("/", payload);
  return res.data;
};
