import { useSearchParams } from "react-router-dom";
import { useRecipe } from "../../hooks/useRecipes";

const Content = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const { data, isLoading } = useRecipe(name);

  return (
    <main className="min-h-screen w-full bg-gray-500 flex-1 p-4">
      {isLoading && "Loading..."}
      {data && (
        <>
          <h2 className="text-4xl text-center font-semibold">{data?.name}</h2>
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-4 uppercase">
              Ingreredients:
            </h3>
            <ul className="ml-8 list-decimal">
              {data.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-4 uppercase">Instruction:</h3>
            <ul className="ml-8 list-decimal">
              {data.instruction.map((ingredient: string, index: number) => (
                <li key={index} className="text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default Content;
