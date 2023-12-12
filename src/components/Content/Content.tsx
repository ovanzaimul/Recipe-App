import { useSearchParams } from "react-router-dom";
import { useRecipe } from "../../hooks/useRecipes";

const Content = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const { data: recipe, isLoading } = useRecipe(name);

  return (
    <main className="min-h-screen w-full bg-gray-500 flex-1 p-4">
      {isLoading && "Loading..."}
      {recipe && (
        <>
          <h2 className="text-4xl text-center font-semibold">{recipe.name}</h2>
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-4 uppercase">
              Ingreredients:
            </h3>
            <ul className="ml-8 list-decimal">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-4 uppercase">Instruction:</h3>
            <ul className="ml-8 list-decimal">
              {recipe.instruction.map((ingredient: string, index: number) => (
                <li key={index} className="text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!isLoading && !recipe && (
        <p className="text-center font-semibold text-gray-700">
          No recipe selected or no recipe found with that name
        </p>
      )}
    </main>
  );
};

export default Content;
