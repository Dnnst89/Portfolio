import React from "react";
import { useState } from "react";
import algoliasearch from "algoliasearch";
import useStoreInformation from "../helpers/useStoreInformation";
import { useLocalCurrencyContext } from "@/src/context/useLocalCurrency";

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

  // if true send LocalCurrencyPrice as price for products else send variant price
  const useLocalCurrency = useLocalCurrencyContext();

  const { storeInformation, storeInformationError} = useStoreInformation(1);
  const currencySymbol = storeInformation?.storeInformation?.data?.attributes?.currencySymbol;

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
          selectedPriceRange.minPrice === (!useLocalCurrency ? 0 : 0) &&
          selectedPriceRange.maxPrice === (!useLocalCurrency ? 25 : 12000)
        }
        onChange={() => {
          if (
            selectedPriceRange &&
            selectedPriceRange.minPrice === (!useLocalCurrency ? 0 : 0) &&
            selectedPriceRange.maxPrice === (!useLocalCurrency ? 25 : 12000)
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
            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, !useLocalCurrency ? 0 : 0, !useLocalCurrency ? 25 : 12000);
          }
        }}
      />
      <label
        className="ml-3 min-w-0 flex-1 text-gray-500"
        htmlFor="priceRange1"
      >
        Hasta {currencySymbol} {!useLocalCurrency ? 25 : 12000}
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        className="ml-3 w-4 h-4 text-gray-500"
        id="priceRange2"
        checked={
          selectedPriceRange &&
          selectedPriceRange.minPrice === (!useLocalCurrency ? 25 : 12000) &&
          selectedPriceRange.maxPrice === (!useLocalCurrency ? 50 : 25000)
        }
        onChange={() => {
          if (
            selectedPriceRange &&
            selectedPriceRange.minPrice === (!useLocalCurrency ? 25 : 12000) &&
            selectedPriceRange.maxPrice === (!useLocalCurrency ? 50 : 25000)
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
            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, !useLocalCurrency ? 25 : 12000, !useLocalCurrency ? 50 : 25000);
          }
        }}
      />
      <label
        className="ml-3 min-w-0 flex-1 text-gray-500"
        htmlFor="priceRange2"
      >
        {currencySymbol} {!useLocalCurrency ? 25 : 12000} a {currencySymbol} {!useLocalCurrency ? 50 : 25000}
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        className="ml-3 w-4 h-4 text-gray-500"
        id="priceRange3"
        checked={
          selectedPriceRange &&
          selectedPriceRange.minPrice === (!useLocalCurrency ? 50 : 25000) &&
          selectedPriceRange.maxPrice === (!useLocalCurrency ? 100 : 50000)
        }
        onChange={() => {
          if (
            selectedPriceRange &&
            selectedPriceRange.minPrice === (!useLocalCurrency ? 50 : 25000) &&
            selectedPriceRange.maxPrice === (!useLocalCurrency ? 100 : 50000)
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
            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, !useLocalCurrency ? 50 : 25000, !useLocalCurrency ? 100 : 50000);
          }
        }}
      />
      <label
        className="ml-3 min-w-0 flex-1 text-gray-500"
        htmlFor="priceRange3"
      >
        {currencySymbol} {!useLocalCurrency ? 50 : 25000} a {currencySymbol} {!useLocalCurrency ? 100 : 50000}
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        className="ml-3 w-4 h-4 text-gray-500"
        id="priceRange4"
        checked={
          selectedPriceRange &&
          selectedPriceRange.minPrice === (!useLocalCurrency ? 100 : 50000) &&
          selectedPriceRange.maxPrice === (!useLocalCurrency ? 200 : 100000)
        }
        onChange={() => {
          if (
            selectedPriceRange &&
            selectedPriceRange.minPrice === (!useLocalCurrency ? 100 : 50000) &&
            selectedPriceRange.maxPrice === (!useLocalCurrency ? 200 : 100000)
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
            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, !useLocalCurrency ? 100 : 50000, !useLocalCurrency ? 200 : 100000);
          }
        }}
      />
      <label
        className="ml-3 min-w-0 flex-1 text-gray-500"
        htmlFor="priceRange4"
      >
        {currencySymbol} {!useLocalCurrency ? 100 : 50000} a {currencySymbol} {!useLocalCurrency ? 200 : 100000}
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        className="ml-3 w-4 h-4 text-gray-500"
        id="priceRange5"
        checked={
          selectedPriceRange &&
          selectedPriceRange.minPrice === (!useLocalCurrency ? 200 : 100000) &&
          selectedPriceRange.maxPrice === (!useLocalCurrency ? 999999 : 999999)
        }
        onChange={() => {
          if (
            selectedPriceRange &&
            selectedPriceRange.minPrice === (!useLocalCurrency ? 200 : 100000) &&
            selectedPriceRange.maxPrice === (!useLocalCurrency ? 999999 : 999999)
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
            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, !useLocalCurrency ? 200 : 100000, !useLocalCurrency ? 999999 : 999999);
          }
        }}
      />
      <label
        className="ml-3 min-w-0 flex-1 text-gray-500"
        htmlFor="priceRange5"
      >
        {currencySymbol} {!useLocalCurrency ? 200 : 100000} y más
      </label>
    </div>
  
    <div className="mt-4 pl-3 text-sm">
      <h5>Filtrar por otro rango: </h5>
      <div className="flex mt-4">
        <input
          id="min"
          type="text"
          placeholder={currencySymbol + " min"}
          className="w-20 mr-2"
          value={minInputValue}
          onChange={handleMinInputChange}
        />
  
        <input
          id="max"
          type="text"
          placeholder={currencySymbol + " max"}
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
