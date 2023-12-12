import React from 'react'
import algoliasearch from "algoliasearch";
import { useForm } from "react-hook-form";

function FilterByPrice({ test, minPriceFilter, maxPriceFilter, setMinPriceFilter, setMaxPriceFilter, setCurrentPage, setHitsPerPage, setNbHits, setNbPages, setResult }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const APPLICATION_ID = "6TQCC8J5LB";
    const SEARCH_API_KEY = "5a6490a15e1b2c9a3c53d7f8328c3f8d";
    const ALGOLIA_INDEX = "development_api::product.product";

    const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
    const index = searchClient.initIndex(ALGOLIA_INDEX);

    const onSubmit = handleSubmit((data) => {
        var minPrice = data.min
        var maxPrice = data.max

        console.log(minPrice, maxPrice)
        if (minPrice === null || minPrice === undefined || minPrice === '') {
            minPrice = 0; // Asignar un valor predeterminado de 0 si minPrice es nulo o vacío
            setMinPriceFilter(0); // <-- Debería ser setMinPriceFilter(0)
        }

        if (maxPrice === null || maxPrice === undefined || maxPrice === '') {
            maxPrice = 999999; // Asignar un valor predeterminado de 99999 si maxPrice es nulo o vacío
            setMaxPriceFilter(999999); // Corregir el valor aquí
        }

        var filters = 'variants.price >= ' + minPrice + ' AND variants.price <= ' + maxPrice;

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
    });

    const handlePriceFilter = (min, max) => {

        setMinPriceFilter(min);
        setMaxPriceFilter(max);

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

    };

    return (
        <div>

            <div className="flex items-center">
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange1" onClick={() => handlePriceFilter(0, 25)}>Hasta $25</label>
            </div>
            <div className="flex items-center">
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange2" onClick={() => handlePriceFilter(25, 50)}>$25 a $50</label>
            </div>
            <div className="flex items-center">
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange3" onClick={() => handlePriceFilter(50, 100)}>$50 a $100</label>
            </div>
            <div className="flex items-center">
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange4" onClick={() => handlePriceFilter(100, 200)}>$100 a $200</label>
            </div>
            <div className="flex items-center">
                <label className="ml-3 min-w-0 flex-1 text-gray-500" htmlFor="priceRange5" onClick={() => handlePriceFilter(200, 999999)}>$200 y más</label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex">
                    <input
                        id="min"
                        type="text"
                        placeholder="$ min"
                        className="w-20 mr-2"
                        {...register('min', {
                            onChange: (e) => { setMinPriceFilter(e.target.value) }
                        })}
                        value={minPriceFilter === 0 ? '' : minPriceFilter}
                    />


                    <input
                        id="max"
                        type="text"
                        placeholder="$ max"
                        className="w-20 mr-2"
                        {...register('max', {
                            onChange: (e) => { setMaxPriceFilter(e.target.value) }
                        })}
                        value={maxPriceFilter === 999999 ? '' : maxPriceFilter}
                    />

                    <input
                        type="submit"
                        value="Ir"
                        className="w-10 bg-pink-200 rounded-md rounded-sm w-[50px] whitespace-nowrap"
                    />
                </div>
            </form>

        </div>
    )
}

export default FilterByPrice