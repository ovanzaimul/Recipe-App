import React from "react";
import { Link } from "react-router-dom";

interface Recipe {
  name: string;
}

interface SearchResultProps {
  recipes: Recipe[];
  isLoading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({ recipes, isLoading }) => {
  return (
    <div className="basis-1/4 max-h-screen overflow-auto scroll-bar">
      {isLoading && "Loading..."}
      {recipes.length <= 0 ? (
        <p className="text-center mt-4">
          No recipes found, try change the search query!
        </p>
      ) : (
        <ul>
          {recipes.map((recipe: Recipe) => (
            <li className="p-[2px]" key={recipe.name}>
              <Link
                to={`/?name=${recipe.name}`}
                className=" bg-purple-400 hover:bg-purple-500 block w-full text-lg p-4 text-left transition-all  border-purple-600 rounded-md"
              >
                {recipe.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
