import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailTable from "@/components/ProductDetailSecondary";
import RelatedItems from "@/components/RelatedItems";

async function getData(id) {
  try {
    const { data } = await algoliaInstace.get(
      `/development_api::product.product/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Post({ params }) {
  const { id } = params;

  const data = await getData(id);

  const {coverImage} = data
  let primero = coverImage[0];
  const {url} = primero
  const { name, description, defaultPrice, sku } = data;

  return (
    <main>
      <ProductDetail name={name} description={description} defaultPrice={defaultPrice} sku={sku} url={url}/>
      <ProductDetailTable description={description}/>
      <RelatedItems />
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://6TQCC8J5LB.algolia.net/1/indexes/development_api::product.product/`,
    {
      headers: {
        "X-Algolia-Api-Key": "5a6490a15e1b2c9a3c53d7f8328c3f8d",
        "X-Algolia-Application-Id": "6TQCC8J5LB",
      },
    }
  );
  const data = await res.json();
  const { hits } = data;

  const paths = hits.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}
