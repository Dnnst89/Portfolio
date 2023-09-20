import DetailComponent from "@/components/DetailComponent";

export default async function GetDetail({ params }) {
  const { id } = params
  return (
    <main>
      <DetailComponent id={id} />
    </main>
  );
}
