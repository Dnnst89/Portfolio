import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const Settings: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CiSettings size={25} />
          <span className="sr-only">Open user menu</span>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="hidden"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full">
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isDarkMode ? "transform translate-x-6" : ""
                    }`}
                  />
                </div>
                <span className="ml-3">Dark Mode</span>
              </label>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700"></div>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => alert("Logging out...")}
            >
              <IoIosLogOut size={25} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
