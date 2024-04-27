import React from "react";
import { useState } from "react";
import algoliasearch from "algoliasearch";
import { useQuery } from "@apollo/client";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";

function FilterByPrice({
  minAgeFilter,
  maxAgeFilter,
  selectedBrands,
  selectedPriceRange,
  handleFilters,
  minPriceFilter,
  maxPriceFilter,
  setMinPriceFilter,
  setMaxPriceFilter,
}) {

  const { data: storeInformation, error: storeInformationError } = useQuery(
    GET_STORE_INFO,
    {
      variables: {
        id: 1,
      },
    }
  );
//   const storeInformation = () => {
//   useStoreInformation(1);
// }
  console.log(storeInformation);
  const currency = storeInformation?.storeInformation?.data?.attributes?.currency;

  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");

  const handleMinInputChange = (e) => {
    setMinInputValue(e.target.value);
  };

  const handleMaxInputChange = (e) => {
    setMaxInputValue(e.target.value);
  };

  const handleIrClick = () => {
    const minPrice = parseFloat(minInputValue === "" ? 0 : minInputValue);
    const maxPrice = parseFloat(maxInputValue === "" ? 999 : maxInputValue);

    // Verificar si los valores son válidos antes de actualizar el estado
    if (!isNaN(minPrice)) {
      setMinPriceFilter(minPrice);
    }

    if (!isNaN(maxPrice)) {
      setMaxPriceFilter(maxPrice);
    }

    // Realizar la lógica de manejo de filtros según sea necesario
    handleFilters(
      selectedBrands,
      minAgeFilter,
      maxAgeFilter,
      minPrice,
      maxPrice
    );
  };
  return (
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="ml-3 w-4 h-4 text-gray-500"
          id="priceRange1"
          checked={
            selectedPriceRange &&
            selectedPriceRange.minPrice === 0 &&
            selectedPriceRange.maxPrice === 12000
          }
          onChange={() => {
            if (
              selectedPriceRange &&
              selectedPriceRange.minPrice === 0 &&
              selectedPriceRange.maxPrice === 12000
            ) {
              // If the checkbox is already checked, uncheck it
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                null,
                null
              );
            } else {
              // If the checkbox is unchecked, check it with the specified range
              handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 0, 12000);
            }
          }}
        />
        <label
          className="ml-3 min-w-0 flex-1 text-gray-500"
          htmlFor="priceRange1"
        >
          Hasta {currency} 12000
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="ml-3 w-4 h-4 text-gray-500"
          id="priceRange2"
          checked={
            selectedPriceRange &&
            selectedPriceRange.minPrice === 12000 &&
            selectedPriceRange.maxPrice === 25000
          }
          onChange={() => {
            if (
              selectedPriceRange &&
              selectedPriceRange.minPrice === 12000 &&
              selectedPriceRange.maxPrice === 25000
            ) {
              // If the checkbox is already checked, uncheck it
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                null,
                null
              );
            } else {
              // If the checkbox is unchecked, check it with the specified range
              handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 12000, 25000);
            }
          }}
        />
        <label
          className="ml-3 min-w-0 flex-1 text-gray-500"
          htmlFor="priceRange2"
        >
          {currency} 12000 a 25000
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="ml-3 w-4 h-4 text-gray-500"
          id="priceRange3"
          checked={
            selectedPriceRange &&
            selectedPriceRange.minPrice === 25000 &&
            selectedPriceRange.maxPrice === 50000
          }
          onChange={() => {
            if (
              selectedPriceRange &&
              selectedPriceRange.minPrice === 25000 &&
              selectedPriceRange.maxPrice === 50000
            ) {
              // If the checkbox is already checked, uncheck it
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                null,
                null
              );
            } else {
              // If the checkbox is unchecked, check it with the specified range
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                25000,
                50000
              );
            }
          }}
        />
        <label
          className="ml-3 min-w-0 flex-1 text-gray-500"
          htmlFor="priceRange3"
        >
          {currency} 25000 a 50000
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="ml-3 w-4 h-4 text-gray-500"
          id="priceRange4"
          checked={
            selectedPriceRange &&
            selectedPriceRange.minPrice === 50000 &&
            selectedPriceRange.maxPrice === 100000
          }
          onChange={() => {
            if (
              selectedPriceRange &&
              selectedPriceRange.minPrice === 50000 &&
              selectedPriceRange.maxPrice === 100000
            ) {
              // If the checkbox is already checked, uncheck it
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                null,
                null
              );
            } else {
              // If the checkbox is unchecked, check it with the specified range
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                50000,
                100000
              );
            }
          }}
        />
        <label
          className="ml-3 min-w-0 flex-1 text-gray-500"
          htmlFor="priceRange4"
        >
          {currency} 50000 a 100000
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="ml-3 w-4 h-4 text-gray-500"
          id="priceRange5"
          checked={
            selectedPriceRange &&
            selectedPriceRange.minPrice === 100000 &&
            selectedPriceRange.maxPrice === 999999
          }
          onChange={() => {
            if (
              selectedPriceRange &&
              selectedPriceRange.minPrice === 100000 &&
              selectedPriceRange.maxPrice === 999999
            ) {
              // If the checkbox is already checked, uncheck it
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                null,
                null
              );
            } else {
              // If the checkbox is unchecked, check it with the specified range
              handleFilters(
                selectedBrands,
                minAgeFilter,
                maxAgeFilter,
                100000,
                999999
              );
            }
          }}
        />
        <label
          className="ml-3 min-w-0 flex-1 text-gray-500"
          htmlFor="priceRange5"
        >
          {currency} 100000 y más
        </label>
      </div>

      <div className="mt-4 pl-3 text-sm">
        <h5>Filtrar por otro rango: </h5>
        <div className="flex mt-4">
          <input
            id="min"
            type="text"
            placeholder="min"
            className="w-20 mr-2"
            value={minInputValue}
            onChange={handleMinInputChange}
          />

          <input
            id="max"
            type="text"
            placeholder="max"
            className="w-20 mr-2"
            value={maxInputValue}
            onChange={handleMaxInputChange}
          />

          <input
            type="button"
            value="Ir"
            className="w-10 bg-pink-200 rounded-full w-[50px] whitespace-nowrap"
            onClick={handleIrClick}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterByPrice;
