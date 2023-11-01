"use client";
import AgeResultsComponent from "@/components/AgeResultsComponent";
import BodyComponent from "@/components/BodyComponent";
import { useEffect, useState } from "react";

const Page = () => {
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    console.log(window?.location?.search?.split("=")[1])
    setQuerySearch(window?.location?.search?.split("=")[1]);
  }, []);
  return (
    <BodyComponent>
      <AgeResultsComponent ageRange={querySearch} />
    </BodyComponent>
  );
};

export default Page;
