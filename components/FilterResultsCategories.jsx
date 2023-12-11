import React, { useState } from 'react'
import ProductFilterContainer from './ProductFilterContainer';
import Spinner from './Spinner';
import toast, { Toaster } from 'react-hot-toast';
import getProductsFilteredCategory from "@/src/graphQl/queries/getProductsFilteredCategory";
import { useQuery } from '@apollo/client';
const FilterResultsCategories = ({ category }) => {
    const [currentPage, setCurrentPage] = useState(1);
    category = decodeURIComponent(category);
    const page = currentPage;
    const pageSize = 12;
    const { loading, error, data } = useQuery(getProductsFilteredCategory, {
        variables: { category, page, pageSize },
    });
    //if (loading) return <Spinner />;
    if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
        autoClose: 5000
    })

    return (
        <div className={loading ? "flex flex-wrap max-w-screen-xl m-auto justify-center my-10" : ""}>
            {loading ? <Spinner /> : <div> <Toaster />
                <div className="flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
                    <h1 className="text-center">Resultados de productos  de {category}</h1>
                </div>
                <ProductFilterContainer
                    result={data.products}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /></div>}

        </div>
    );
}

export default FilterResultsCategories