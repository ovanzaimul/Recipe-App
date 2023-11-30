import { useQuery } from "react-query";
import { getRecipe } from "../api/recipes";

export const useRecipe = (name: string) => {
  const query = useQuery(["recipe", name], () => getRecipe(name), {
    staleTime: Infinity,
  });

  return { ...query, data: query.data?.recipe };
};
