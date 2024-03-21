import React, { useState, useEffect } from "react";
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
  // No garantiza que estamos ubicados en la seccion filtro por edades
  //const filterType = useSelector((state) => state.filter.isAgeRangeURL);

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

  if (brandsForCheckbox?.length == 0) {
    return (
      <div className="ml-3 min-w-0 flex-1 text-gray-500">
        <h5>No hay marcas para filtrar en esta categoría</h5>
      </div>
    );
    // si la condicion se cumple renderizara la marcas segun las edades y  no la categoria
  } else if (filterType === "ageRange") {
    //Obtenemos las marcas
    const brandsByAge = brandsForCheckbox?.products?.data.map((entry) => {
      return entry.attributes.brand;
    });
    // Filtramos las marcas repetidas
    const filteringAgeBrands = new Set(brandsByAge);
    // Las pasamos a un arreglo con marcas unicas
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
    return (
      <div>
        {brandsForCheckbox &&
          brandsForCheckbox.map(
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
