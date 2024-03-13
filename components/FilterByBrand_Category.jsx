import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  console.log("selected brand", selectedBrands);

  const filteredBrands = useSelector((state) => state.filter.filteredBrands);
  const brandsFilteredArray = filteredBrands.map(
    (entry) => entry.brandsFiltered
  );
  const handleBrandSelection = (brand) => {
    // Se evita la mutacion del array con push y se agrega opread operation.
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);

    // Call the handlePriceFilter function to apply the filter
    handleFilters(
      updatedBrands,
      minAgeFilter,
      maxAgeFilter,
      minPriceFilter,
      maxPriceFilter
    );
  };

  if (brands.length == 0 && brandsFilteredArray[0].length === 0) {
    return (
      <div className="ml-3 min-w-0 flex-1 text-gray-500">
        <h5>No hay marcas para filtrar en esta categoría</h5>
      </div>
    );
  } else if (filteredBrands[0].isAgeRangeURL) {
    return (
      <div>
        {brandsFilteredArray[0] &&
          brandsFilteredArray[0].map(
            (brand, index) =>
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
  } else {
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
}

export default FilterByBrand_Category;
