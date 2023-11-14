"use client";
import Image from "next/image";
import FilterProductCard from "./FilterProductCard";
import FilterPagination from "./FilterPagination";

const ProductFilterContainer = ({ result, currentPage, setCurrentPage }) => {

    const { data } = result
    return (
        <>
            <div className="flex flex-wrap max-w-screen-xl m-auto justify-center">
                {data
                    ? data.map((item) => {
                        return <FilterProductCard key={item.id} id={item.id} name={item.attributes.name} coverImage={item.attributes.coverImage.data} defaultPrice={item.attributes.defaultPrice} brand={item.attributes.brand} />;
                    })
                    : null}
            </div>
            <FilterPagination
                nbPages={result.meta.pagination.pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};
export default ProductFilterContainer;
