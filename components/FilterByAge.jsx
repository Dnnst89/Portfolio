import React from "react";
import { useState } from "react";
import algoliasearch from "algoliasearch";
function FilterByAge({
    selectedAgeRange,
    handleFilters,
    selectedBrands,
    minPriceFilter,
    maxPriceFilter
}) {

    return (
        <div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="ageRange1"
                    checked={
                        selectedAgeRange &&
                        selectedAgeRange.minAge === 0 &&
                        selectedAgeRange.maxAge === 2
                    }
                    onChange={() => handleFilters(selectedBrands, 0, 2, minPriceFilter, maxPriceFilter)}
                />
                <label
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                    htmlFor="ageRange1"
                >
                    0 a 2 años
                </label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="ageRange2"
                    checked={
                        selectedAgeRange &&
                        selectedAgeRange.minAge === 2 &&
                        selectedAgeRange.maxAge === 3
                    }
                    onChange={() => handleFilters(selectedBrands, 2, 3, minPriceFilter, maxPriceFilter)}
                />
                <label
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                    htmlFor="ageRange2"
                >
                    2 a 3 años
                </label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="ageRange3"
                    checked={
                        selectedAgeRange &&
                        selectedAgeRange.minAge === 4 &&
                        selectedAgeRange.maxAge === 5
                    }
                    onChange={() => handleFilters(selectedBrands, 4, 5, minPriceFilter, maxPriceFilter)}
                />
                <label
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                    htmlFor="ageRange3"
                >
                    4 a 5 años
                </label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="ageRange4"
                    checked={
                        selectedAgeRange &&
                        selectedAgeRange.minAge === 6 &&
                        selectedAgeRange.maxAge === 7
                    }
                    onChange={() => handleFilters(selectedBrands, 6, 7, minPriceFilter, maxPriceFilter)}
                />
                <label
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                    htmlFor="ageRange4"
                >
                    6 a 7 años
                </label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="ageRange5"
                    checked={
                        selectedAgeRange &&
                        selectedAgeRange.minAge === 8 &&
                        selectedAgeRange.maxAge === 100
                    }
                    onChange={() => handleFilters(selectedBrands, 8, 100, minPriceFilter, maxPriceFilter)}
                />
                <label
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                    htmlFor="ageRange5"
                >
                    De 8 años o más
                </label>
            </div>
        </div>
    );
}
export default FilterByAge;