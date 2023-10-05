"use client";
import Image from "next/image";
import AgeProductCard from "./AgeProductCard";
import AgePagination from "./AgePagination";

const ProductFilterContainer = ({ result, currentPage, setCurrentPage }) => {

    const { data } = result
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full">
                {data
                    ? data.map((item) => {
                        return <AgeProductCard key={item.id} id={item.id} name={item.attributes.name} coverImage={item.attributes.coverImage.data} defaultPrice={item.attributes.brand} />;
                    })
                    : null}
            </div>
            <AgePagination
                nbPages={result.meta.pagination.pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};
export default ProductFilterContainer;
