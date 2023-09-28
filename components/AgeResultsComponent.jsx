"use client";
import { useQuery } from "@apollo/client";
import getProductByAgeRange from "@/src/graphQl/queries/getProductByAgeRange";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useState } from "react";

export default function AgeResultsComponent({ ageRange }) {

    const [currentPage, setCurrentPage] = useState(1);

    const page = currentPage
    const pageSize = 10
    const { loading, error, data } = useQuery(getProductByAgeRange, {
        variables: { ageRange, page, pageSize },
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>

    const { variants } = data

    return (
        <ProductFilterContainer result={variants} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    );
}
