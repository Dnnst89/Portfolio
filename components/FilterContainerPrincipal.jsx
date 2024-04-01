import FilterByPrice from "./FilterByPrice";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import FilterByBrand from "./FilterByBrand";
import FilterByBrand_Category from "./FilterByBrand_Category";
import FilterByAge from "./FilterByAge";
import React from "react";
function FilterContainerPrincipal({
  brands,
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
    <div className="max-w-screen-xl mx-5 justify hidden md:block ml-0 mr-0">
      {true && (
        <div className="">
          <div>
            <div className="bg-floralwhite">
              <div className=""></div>
              <div className="">
                <div className="relative mr-auto flex h-full max-w-xs flex-col py-4 pb-12 shadow-xl">
                  <div className="flex items-center j px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtros
                    </h2>
                  </div>
                  <form className="mt-4 border-t border-gray-200">
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <div
                          type="button"
                          className="flex w-full items-center justify-between bg-resene px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Edad
                          </span>
                        </div>
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
                        <div
                          type="button"
                          className="flex w-full items-center justify-between bg-resene px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Precio
                          </span>
                        </div>
                      </h3>
                      {/* div for category filter */}
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
                    {queryType == "category" ? (                      
                      // div for filter when queryType is "category"
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <div
                            type="button"
                            className="flex w-full items-center justify-between bg-resene px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-0"
                            aria-expanded="false"
                          >
                            <span className="font-medium text-gray-900">
                              Marca
                            </span>
                          </div>
                        </h3>

                        <div className="pt-6" id="filter-section-mobile-0">
                          <div className="space-y-6">
                            <FilterByBrand_Category
                              brands={brands}
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
                      </div>)
                      // end div for filter when queryType is "category"
                      :
                      (
                        // div for filter when use the search component
                        <div className="border-t border-gray-200 px-4 py-6">
                          <h3 className="-mx-2 -my-3 flow-root">
                            <div
                              type="button"
                              className="flex w-full items-center justify-between bg-resene px-2 py-3 text-gray-400 hover:text-gray-500"
                              aria-controls="filter-section-mobile-0"
                              aria-expanded="false"
                            >
                              <span className="font-medium text-gray-900">
                                Marca
                              </span>
                            </div>
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
                        </div> // end div for filter when use the search component
                      )
                      }
                    {/* end div for category filter */}
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
export default FilterContainerPrincipal;