import React from 'react'
import { useState } from 'react';
import algoliasearch from "algoliasearch";

function FilterByPrice({ test, minPriceFilter, maxPriceFilter, setMinPriceFilter, setMaxPriceFilter, setCurrentPage, setHitsPerPage, setNbHits, setNbPages, setResult }) {

    const APPLICATION_ID = "6TQCC8J5LB";
    const SEARCH_API_KEY = "5a6490a15e1b2c9a3c53d7f8328c3f8d";
    const ALGOLIA_INDEX = "development_api::product.product";

    const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
    const index = searchClient.initIndex(ALGOLIA_INDEX);

    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const handlePriceFilter = (min, max) => {

        setMinPriceFilter(min);
        setMaxPriceFilter(max);

        if (min === null || min === undefined || min === '') {
            min = 0; // Asignar un valor predeterminado de 0 si minPrice es nulo o vacío
            setMinPriceFilter(0); // <-- Debería ser setMinPriceFilter(0)
        }

        if (max === null || max === undefined || max === '') {
            max = 999999; // Asignar un valor predeterminado de 99999 si maxPrice es nulo o vacío
            setMaxPriceFilter(999999); // Corregir el valor aquí
        }

        var filters = 'variants.price >= ' + min + ' AND variants.price <= ' + max;

        const decodedQueryString = decodeURIComponent(test.query);

        index.search(decodedQueryString, {
            filters: filters
        }).then((response) => {
            setResult(response);
            const { hitsPerPage, nbHits, nbPages } = response;
            setHitsPerPage(hitsPerPage);
            setNbHits(nbHits);
            setNbPages(nbPages);
        });

        setCurrentPage(0)
        setSelectedPriceRange({ min, max });

    };

    return (
        <div>

            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange1"
                    checked={selectedPriceRange && selectedPriceRange.min === 0 && selectedPriceRange.max === 25}
                    onChange={() => handlePriceFilter(0, 25)}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange1">Hasta $25</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange2"
                    checked={selectedPriceRange && selectedPriceRange.min === 25 && selectedPriceRange.max === 50}
                    onChange={() => handlePriceFilter(25, 50)}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange2">$25 a $50</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange3"
                    checked={selectedPriceRange && selectedPriceRange.min === 50 && selectedPriceRange.max === 100}
                    onChange={() => handlePriceFilter(50, 100)}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange3">$50 a $100</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange4"
                    checked={selectedPriceRange && selectedPriceRange.min === 100 && selectedPriceRange.max === 200}
                    onChange={() => handlePriceFilter(100, 200)}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange4">$100 a $200</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    className="ml-3 w-4 h-4 text-gray-500"
                    id="priceRange5"
                    checked={selectedPriceRange && selectedPriceRange.min === 200 && selectedPriceRange.max === 999999}
                    onChange={() => handlePriceFilter(200, 999999)}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange5">$200 y más</label>
            </div>

            <div>

                <div className="flex">
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
                        onClick={() => handlePriceFilter(minPriceFilter, maxPriceFilter)}
                    />
                </div>
            </div>

        </div>
    )
}

export default FilterByPrice