'use client';
import { useEffect, useState } from "react";
import Navbar from "@/app/layouts/includes/Navbar";
import TopMenu from "@/app/layouts/includes/TopMenu";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

export default function GetResults({ params }) {
    const [products, setProducts] = useState([]);
    const { q } = params

    async function getHits() {
        try {
            const response = await fetch(`https://6TQCC8J5LB.algolia.net/1/indexes/development_api::product.product?query=${q}`, { headers: { "X-Algolia-Api-Key": "5a6490a15e1b2c9a3c53d7f8328c3f8d", "X-Algolia-Application-Id": "6TQCC8J5LB" } });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            // ✅ call response.json() here
            const { hits } = await response.json();
            return hits;
        } catch (err) {
            console.log(err);
        }
    }

    
    async function allResults() {
        const hits = await getHits()
        setProducts(hits)

    }

    useEffect(() => {
        if (!q) return null;
        allResults()
    }, [q]);

    console.log(products)

    return (
        <>
            <div className="">
                <TopMenu />
                <Navbar />
            </div>
            <ProductContainer products={products}/>
        </>
    )
}