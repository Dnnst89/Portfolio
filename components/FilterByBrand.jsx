import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";

function FilterByBrand({
  minAgeFilter,
  maxAgeFilter,
  handleFilters,
  test,
  selectedBrands,
  setSelectedBrands,
  minPriceFilter,
  maxPriceFilter,
  filteredBrands,
  isAgeRangeURL,
}) {
  const APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID;
  const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY;
  const ALGOLIA_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

  const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
  const index = searchClient.initIndex(ALGOLIA_INDEX);

  const [brands, setBrands] = useState(null);

  async function getBrands() {
    let allBrands = isAgeRangeURL ? filteredBrands : [];

    let page = 0;
    const hitsPerPage = 100;

    let results;
    let newResults = [];
    if (test.query != undefined) {
      do {
        const { hits, nbHits } = await index.search(
          decodeURIComponent(test.query),
          {
            attributesToRetrieve: ["brand", "variants"],
            page: page,
            hitsPerPage: hitsPerPage,
          }
        );
        results = hits;
        results.forEach((item) => {
          if (item.variants.length > 0) {
            item.variants.forEach((variant) => {
              if (variant.initialAge != null && variant.finalAge != null) {
                newResults.push(item);
              }
            });
          }
        });

        allBrands = allBrands.concat(
          Array.from(new Set(newResults.map((item) => item.brand)))
        );

        page++;
      } while (page * hitsPerPage < results.nbHits);
    } 
    setBrands(allBrands);
  }
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

export default FilterByBrand;
