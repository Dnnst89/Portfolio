"use client";
import Image from "next/image";
import AgeProductCard from "./AgeProductCard";
import AgePagination from "./AgePagination";

const ProductFilterContainer = ({ result, currentPage, setCurrentPage }) => {

    const { data } = result
    return (
        <>
            <div className="flex flex-wrap max-w-screen-xl m-auto justify-center">
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
