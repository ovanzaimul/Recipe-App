import { useMutation, useQuery } from "react-query";
import { addRecipe, getAllRecipes, getRecipe } from "../api/recipes";

export const useRecipes = (searchQuery: string = "") => {
  const query = useQuery(["recipes"], () => getAllRecipes(searchQuery), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const data = query.data?.recipes || [];

  return { ...query, data };
};

export const useRecipe = (name: string) => {
  const query = useQuery(["recipe", name], () => getRecipe(name), {
    staleTime: Infinity,
  });

  return { ...query, data: query.data?.recipe };
};

export const useAddRecipe = () => {
  const mutation = useMutation(addRecipe);

  return mutation;
};
