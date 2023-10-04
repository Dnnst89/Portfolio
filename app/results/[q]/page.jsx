import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import ResultsComponent from "@/components/ResultsComponent";

export default function GetResults({ params }) {
  return (
    <>
      {/* <ResultsComponent query={params.q} /> */}
      <h3>test</h3>
    </>
  );
}

// export async function getStaticPaths() {
//   const { data } = await algoliaInstace.get(
//     `/development_api::product.product/`
//   );
//   const paths = data?.hits.map((product) => ({
//     params: { q: product.name.toString() },
//   }));
//   return { paths, fallback: true };
// }
