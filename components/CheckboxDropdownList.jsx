"use client";
import { useState } from "react";

const CheckboxDropdownList = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Add more options as needed
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="mb-2 text-lg font-medium">Select options:</p>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-indigo-500 border border-gray-300 rounded-md hover:bg-indigo-400 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-800 transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedOptions.length > 0
              ? selectedOptions
                  .map(
                    (option) => options.find((o) => o.value === option)?.label
                  )
                  .join(", ")
              : "Select options"}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 8.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {selectedOptions.length > 0 && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
            <div className="rounded-md bg-white shadow-xs">
              <div className="flex flex-col py-2">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mx-2"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxDropdownList;
