import React from 'react'
import { useState } from 'react';
import algoliasearch from "algoliasearch";

function FilterByPrice({ minAgeFilter, maxAgeFilter, selectedBrands, selectedPriceRange, handleFilters, minPriceFilter, maxPriceFilter, setMinPriceFilter, setMaxPriceFilter }) {

    return (
        <div>

            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange1"
                    checked={selectedPriceRange && selectedPriceRange.minPrice === 0 && selectedPriceRange.maxPrice === 25}
                    onChange={() => {
                        if (
                            selectedPriceRange &&
                            selectedPriceRange.minPrice === 0 &&
                            selectedPriceRange.maxPrice === 25
                        ) {
                            // If the checkbox is already checked, uncheck it
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, null, null);
                        } else {
                            // If the checkbox is unchecked, check it with the specified range
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 0, 25);
                        }
                    }}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange1">Hasta $25</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange2"
                    checked={selectedPriceRange && selectedPriceRange.minPrice === 25 && selectedPriceRange.maxPrice === 50}
                    onChange={() => {
                        if (
                            selectedPriceRange &&
                            selectedPriceRange.minPrice === 25 &&
                            selectedPriceRange.maxPrice === 50
                        ) {
                            // If the checkbox is already checked, uncheck it
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, null, null);
                        } else {
                            // If the checkbox is unchecked, check it with the specified range
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 25, 50);
                        }
                    }}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange2">$25 a $50</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange3"
                    checked={selectedPriceRange && selectedPriceRange.minPrice === 50 && selectedPriceRange.maxPrice === 100}
                    onChange={() => {
                        if (
                            selectedPriceRange &&
                            selectedPriceRange.minPrice === 50 &&
                            selectedPriceRange.maxPrice === 100
                        ) {
                            // If the checkbox is already checked, uncheck it
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, null, null);
                        } else {
                            // If the checkbox is unchecked, check it with the specified range
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 50, 100);
                        }
                    }}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange3">$50 a $100</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange4"
                    checked={selectedPriceRange && selectedPriceRange.minPrice === 100 && selectedPriceRange.maxPrice === 200}
                    onChange={() => {
                        if (
                            selectedPriceRange &&
                            selectedPriceRange.minPrice === 100 &&
                            selectedPriceRange.maxPrice === 200
                        ) {
                            // If the checkbox is already checked, uncheck it
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, null, null);
                        } else {
                            // If the checkbox is unchecked, check it with the specified range
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 100, 200);
                        }
                    }}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange4">$100 a $200</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange5"
                    checked={selectedPriceRange && selectedPriceRange.minPrice === 200 && selectedPriceRange.maxPrice === 999999}
                    onChange={() => {
                        if (
                            selectedPriceRange &&
                            selectedPriceRange.minPrice === 200 &&
                            selectedPriceRange.maxPrice === 999999
                        ) {
                            // If the checkbox is already checked, uncheck it
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, null, null);
                        } else {
                            // If the checkbox is unchecked, check it with the specified range
                            handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, 20, 999999);
                        }
                    }}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange5">$200 y más</label>
            </div>

            <div className="mt-4 pl-3 text-sm">

                <h5>Precio por rango específico: </h5>
                <div className="flex mt-4">
                    <input
                        id="min"
                        type="text"
                        placeholder="$ min"
                        className="w-20 mr-2"
                        onChange={(e) => {
                            setMinPriceFilter(e.target.value);
                        }}
                        value={minPriceFilter === 0 ? '' : minPriceFilter}
                    />


                    <input
                        id="max"
                        type="text"
                        placeholder="$ max"
                        className="w-20 mr-2"
                        onChange={(e) => {
                            setMaxPriceFilter(e.target.value);
                        }}
                        value={maxPriceFilter === 999999 ? '' : maxPriceFilter}
                    />

                    <input
                        type="button"
                        value="Ir"
                        className="w-10 bg-pink-200 rounded-md rounded-sm w-[50px] whitespace-nowrap"
                        onClick={() => handleFilters(selectedBrands, minAgeFilter, maxAgeFilter, minPriceFilter, maxPriceFilter)}
                    />
                </div>
            </div>

        </div>
    )
}

export default FilterByPrice