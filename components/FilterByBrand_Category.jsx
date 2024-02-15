import React, { useState, useEffect } from "react";


function FilterByBrand_Category({
  category,
  minAgeFilter,
  maxAgeFilter,
  handleFilters,
  selectedBrands,
  setSelectedBrands,
  minPriceFilter,
  maxPriceFilter,
}) {

  const [brands, setBrands] = useState(null);

  async function getBrands() {
    let page = 1;
    const hitsPerPage = 100; // The number of results per page
    try {
      let hasMorePages = true;
      let brandsSet = new Set();
      while (hasMorePages) {
        const response = await fetch(`http://dev.detinmarin.cr:1337/api/products?filters[categories][name][$eq]=${category}&pagination[page]=${page}&pagination[pageSize]=${hitsPerPage}`);
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          for (let index = 0; index < data.data.length; index++) {
            brandsSet.add(data.data[index].attributes.brand);
          }
          page++;
        } else {
          hasMorePages = false; // There are no more pages available
        }
      }
      let allBrands = [...brandsSet];
      //Update state after iteration completion
      setBrands(allBrands);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  // Llamas a getBrands() solo la primera vez, para asegurarte de que se guarden las marcas una sola vez
  // getBrands();
  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandSelection = (brand) => {

    const selectedBrandsCopy = [...selectedBrands];
    const index = selectedBrandsCopy.indexOf(brand);

    if (index === -1) {
      selectedBrandsCopy.push(brand);
    } else {
      selectedBrandsCopy.splice(index, 1);
    }

    setSelectedBrands(selectedBrandsCopy);

    // Llama a la función handlePriceFilter para aplicar el filtro
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
            // Verifica si brand es nulo o vacío antes de renderizar
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
