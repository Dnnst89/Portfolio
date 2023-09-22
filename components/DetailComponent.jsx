"use client"
import ProductDetail from "@/components/ProductDetail";
import ProductDetailSecondary from "@/components/ProductDetailSecondary";
import RelatedItems from "@/components/RelatedItems";
import { useQuery } from "@apollo/client";
import ProductDetailQuery from "@/src/graphQl/queries/productDetail";

export default function DetailComponent({ id }) {

    const { loading, error, data } = useQuery(ProductDetailQuery, {
        variables: { id },
    });

    if (loading) return <p>Loading ...</p>;

    return (
        <main>
            <ProductDetail name={data?.product.data.attributes.name} description={data?.product.data.attributes.description} sku={data?.product.data.attributes.sku} variants={data?.product.data.attributes.variants.data} materials={data?.product.data.attributes.materials.data} />
            <ProductDetailSecondary id={data?.product.data.id} description={data?.product.data.attributes.description} reviews={data?.product.data.attributes.reviews.data} />
            <RelatedItems />
        </main>
    );
}