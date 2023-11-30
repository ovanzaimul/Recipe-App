import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  refetch: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setSearchQuery,
  refetch,
  searchQuery,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-purple-400 flex h-16 px-4 justify-between items-center mb-4 rounded-md">
      <Link to="/" className="text-xl font-bold underline underline-offset-8">
        Recipe App
      </Link>
      <form className="basis-5/12" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-1 pl-4 border-none outline-purple-600 rounded-lg"
          placeholder="Search for recipes (e.g., Nasi kuning)"
          value={searchQuery}
          onChange={handleOnChange}
        />
      </form>
      <div className="flex">
        {/* <button className="hover:bg-purple-500 rounded-lg px-2">
          <IoIosBookmark className="text-2xl" />
        </button> */}
        <button className="flex items-center font-medium hover:bg-purple-500 rounded-lg px-2">
          <IoIosAdd className="text-3xl font-extrabold mr-[-5px]" />
          Add Recipe
        </button>
      </div>
    </header>
  );
};

export default Header;
