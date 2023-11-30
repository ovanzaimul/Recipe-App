import axios from "axios";

const recipesApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// interface Recipe {
//   name: string,
//   ingredients: string[],
//   instruction: string[]
// }

export const getAllRecipes = async (searchQuery: string) => {
  if (!searchQuery) return;
  const res = await recipesApi.get(`/recipes?search=${searchQuery}`);
  return res.data;
};

export const getRecipe = async (idOrName: string) => {
  if (!idOrName) return;
  const res = await recipesApi.get(`/recipes/${idOrName}`);
  return res.data;
};
