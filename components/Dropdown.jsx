import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={label}
        name={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Seleccione {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
