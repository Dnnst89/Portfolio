import DetailComponent from "@/components/DetailComponent";

export default async function GetDetail({ params }) {
  const { id } = params
  return (
    <main>
      <DetailComponent id={id} />
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
