import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailTable from "@/components/ProductDetailSecondary";
import RelatedItems from "@/components/RelatedItems";
import { atRule } from "postcss";
import { Convergence } from "next/font/google";

async function getData(id) {
  try {
    const res = await fetch(
      `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337/api/products/${id}?populate=*`
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Post({ params }) {
  const { id } = params;

  const {attributes} = await getData(id);
  const coverImage = attributes.coverImage.data

  const materials = attributes.materials.data
  let one = materials[0];
  const material= one.attributes.name

  const variants = attributes.variants.data
  let two = variants[0];
  const variant= two.attributes

  
  const categories = attributes.categories.data
  let three = categories[0];
  const category= three.attributes.name

  const { name, description, defaultPrice, sku } = attributes;

  return (
    <main>
      <ProductDetail name={name} description={description} defaultPrice={defaultPrice} sku={sku} coverImage={coverImage} material={material} variant={variant} category={category}/>
      <ProductDetailTable description={description} />
      <RelatedItems />
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337/api/products`
  );
  const { data } = await res.json();

  const paths = data.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}
