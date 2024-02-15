import FilterByPrice from "./FilterByPrice";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import FilterByBrand from "./FilterByBrand";
import FilterByAge from "./FilterByAge";
import React from "react";
import FilterByBrand_Category from "./FilterByBrand_Category";
function FilterContainer({
  category,
  selectedAgeRange,
  setMaxAgeFilter,
  maxAgeFilter,
  setMinAgeFilter,
  minAgeFilter,
  selectedPriceRange,
  handleFilters,
  test,
  minPriceFilter,
  maxPriceFilter,
  setMinPriceFilter,
  setMaxPriceFilter,
  selectedBrands,
  setSelectedBrands,
  queryType
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-screen-xl w-full flex mx-5 justify md:mx-[100px] block md:hidden">
      <div className="flex items-start mt-10">
        {" "}
        <h3 className="ml-5" onClick={() => setIsOpen(!isOpen)}>
          Filtros
        </h3>
        <button
          type="button"
          className="-m-2 ml-1 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Filtros</span>
          <FaFilter />
        </button>
      </div>
      {isOpen && (
        <div className="bg-white">
          <div>
            <div className="relative z-40 " role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-black bg-opacity-25"></div>
              <div className="fixed inset-0 z-40 flex">
                <div className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtros
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <form className="mt-4 border-t border-gray-200">
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Edad
                          </span>
                        </button>
                      </h3>
                      <div className="pt-6" id="filter-section-mobile-0">
                        <div className="space-y-6">
                          <FilterByAge
                            test={test}
                            minAgeFilter={minAgeFilter}
                            maxAgeFilter={maxAgeFilter}
                            setMaxAgeFilter={setMaxAgeFilter}
                            setMinAgeFilter={setMinAgeFilter}
                            selectedBrands={selectedBrands}
                            handleFilters={handleFilters}
                            minPriceFilter={minPriceFilter}
                            maxPriceFilter={maxPriceFilter}
                            selectedAgeRange={selectedAgeRange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Precio
                          </span>
                        </button>
                      </h3>
                      <div className="pt-6" id="filter-section-mobile-0">
                        <div className="space-y-6">
                          <FilterByPrice
                            selectedBrands={selectedBrands}
                            selectedPriceRange={selectedPriceRange}
                            handleFilters={handleFilters}
                            test={test}
                            minPriceFilter={minPriceFilter}
                            maxPriceFilter={maxPriceFilter}
                            setMaxPriceFilter={setMaxPriceFilter}
                            setMinPriceFilter={setMinPriceFilter}
                            minAgeFilter={minAgeFilter}
                            maxAgeFilter={maxAgeFilter}
                          />
                        </div>
                      </div>
                    </div>
                     {/* div for brand options */}
                    {queryType == "category" ? (
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-0"
                            aria-expanded="false"
                          >
                            <span className="font-medium text-gray-900">
                              Marca
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-0">
                          <div className="space-y-6">
                            <FilterByBrand_Category
                             category={category} //category selected in NavCategories.jsx
                              minPriceFilter={minPriceFilter}
                              maxPriceFilter={maxPriceFilter}
                              handleFilters={handleFilters}
                              selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              minAgeFilter={minAgeFilter}
                              maxAgeFilter={maxAgeFilter}
                            ></FilterByBrand_Category>
                          </div>
                        </div>
                      </div>                       
                    ) : (
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-0"
                            aria-expanded="false"
                          >
                            <span className="font-medium text-gray-900">
                              Marca
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-0">
                          <div className="space-y-6">
                            <FilterByBrand
                              minPriceFilter={minPriceFilter}
                              maxPriceFilter={maxPriceFilter}
                              handleFilters={handleFilters}
                              test={test}
                              selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              minAgeFilter={minAgeFilter}
                              maxAgeFilter={maxAgeFilter}
                            ></FilterByBrand>
                          </div>
                        </div>
                      </div>                       
                    )}
                     {/* end of div for brand options */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default FilterContainer;