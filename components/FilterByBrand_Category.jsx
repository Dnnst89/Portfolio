import React, { useState, useEffect } from "react";

function FilterByBrand_Category({
  brands,
  minAgeFilter,
  maxAgeFilter,
  handleFilters,
  selectedBrands,
  setSelectedBrands,
  minPriceFilter,
  maxPriceFilter,
}) {

  const handleBrandSelection = (brand) => {
    const selectedBrandsCopy = [...selectedBrands];
    const index = selectedBrandsCopy.indexOf(brand);

    if (index === -1) {
      selectedBrandsCopy.push(brand);
    } else {
      selectedBrandsCopy.splice(index, 1);
    }

    setSelectedBrands(selectedBrandsCopy);

    // Call the handlePriceFilter function to apply the filter
    handleFilters(
      selectedBrandsCopy,
      minAgeFilter,
      maxAgeFilter,
      minPriceFilter,
      maxPriceFilter
    );
  };

  return (
    <div>
      {brands &&
        brands.map(
          (brand, index) =>
            // Check if brand is null or empty before rendering
            brand &&
            brand.trim() !== "" && (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-3 w-4 h-4 text-gray-500"
                  id={`brand${index}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandSelection(brand)}
                />
                <label
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                  htmlFor={`brand${index}`}
                >
                  {brand}
                </label>
              </div>
            )
        )}
    </div>
  );
}

export default FilterByBrand_Category;
