import { useState } from "react";
import useRecipes from "../../hooks/useRecipes";
import Header from "../Header";
import SearchResult from "../SearchResult";
import Content from "../Content";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: recipes, refetch, isLoading } = useRecipes(searchQuery);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-400">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        refetch={refetch}
        isLoading={isLoading}
      />
      <div className="flex [&>*]:bg-purple-300 [&>*]:rounded-md gap-4">
        <SearchResult recipes={recipes} isLoading={isLoading} />
        <Content />
      </div>
    </div>
  );
}

export default App;
