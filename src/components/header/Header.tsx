import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-800 dark:text-gray-50">
      <div className="flex items-center gap-4">
        <form className="relative">
          df
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:bg-white focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:ring-gray-400"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button
          //variant="ghost"
          //size="icon"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          dd
        </button>
        <button
          //variant="ghost"
          //size="icon"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          {/* <img
            src="/placeholder.svg"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          /> */}
        </button>
      </div>
    </header>
  );
};
export default Header;
