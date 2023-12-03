import axios from "axios";

const recipesApi = axios.create({
  baseURL: "http://localhost:3000/api/v1/recipes",
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
