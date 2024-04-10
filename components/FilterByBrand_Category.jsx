import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function FilterByBrand_Category({
  brandsForCheckbox,
  minAgeFilter,
  maxAgeFilter,
  handleFilters,
  selectedBrands,
  setSelectedBrands,
  minPriceFilter,
  maxPriceFilter,
  filterType,
}) {
  const router = useRouter();

  const handleBrandSelection = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);

    handleFilters(
      updatedBrands,
      minAgeFilter,
      maxAgeFilter,
      minPriceFilter,
      maxPriceFilter
    );
  };

  if (
    !brandsForCheckbox ||
    (Array.isArray(brandsForCheckbox) && brandsForCheckbox.length === 0)
  ) {
    return (
      <div className="ml-3 min-w-0 flex-1 text-gray-500">
        <h5>No hay marcas para filtrar en esta categoría</h5>
      </div>
    );
  } else if (filterType === "ageRange") {
    const brandsByAge = brandsForCheckbox?.products?.data.map((entry) => {
      return entry.attributes.brand;
    });
    const filteringAgeBrands = new Set(brandsByAge);
    const uniqueBrandByAge = Array.from(filteringAgeBrands);
    return (
      <div>
        {uniqueBrandByAge &&
          uniqueBrandByAge.map(
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
    if (Array.isArray(brandsForCheckbox)) {
      return (
        <div>
          {brandsForCheckbox &&
            brandsForCheckbox.map(
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
      router.push("/not-found");
    }
  }
}

export default FilterByBrand_Category;
