import AgeResultsComponent from "@/components/AgeResultsComponent";
import BodyComponent from "@/components/BodyComponent";

function page({ params }) {
  const { q } = params;

  return (
    <BodyComponent>
      <AgeResultsComponent ageRange={q} />
    </BodyComponent>
  );
}

export default page;
