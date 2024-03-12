import { useState } from "react";
import { useEffect } from "react";

/**
 *
 * @param {String} category - get the a single category.
 * @returns - A filtered category by brand
 * - loading state when the function is executed true and false when is finished.
 */
const useFilteredBrand = (category) => {
  const [brandsForCheckbox, setBrandsForCheckbox] = useState(null);
  const [loadingBrands, setLoadingBrands] = useState(true);
  useEffect(() => {
    async function getBrands() {
      let page = 1;
      const hitsPerPage = 100; // The number of results per page
      try {
        setLoadingBrands(true);
        let hasMorePages = true;
        let brandsSet = new Set(); //set to have unique brands and not repeated
        while (hasMorePages) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/products?filters[categories][name][$contains]=${category}&pagination[page]=${page}&pagination[pageSize]=${hitsPerPage}`
          );
          const data = await response.json();
          console.log("data", data);
          if (data && data.data && data.data.length > 0) {
            for (let index = 0; index < data.data.length; index++) {
              brandsSet.add(data.data[index].attributes.brand);
            }
            page++;
          } else {
            hasMorePages = false; // There are no more pages available
          }
        }
        let allBrands = [...brandsSet]; //parse set to list
        //Update state after iteration completion
        setBrandsForCheckbox(allBrands);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoadingBrands(false);
      }
    }
    getBrands();
  }, [category]);
  return { loadingBrands, brandsForCheckbox };
};
export default useFilteredBrand;
