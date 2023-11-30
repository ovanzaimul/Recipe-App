import { useQuery } from "react-query";
import { getAllRecipes } from "../api/recipes";

const useRecipes = (searchQuery: string = "") => {
  const query = useQuery(["recipes"], () => getAllRecipes(searchQuery), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const data = query.data?.recipes || [];

  return { ...query, data };
};

export default useRecipes;
