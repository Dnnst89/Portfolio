"use client";
import FiltersResultsComponent from "@/components/FiltersResultsComponent";
import BodyComponent from "@/components/BodyComponent";
import { useEffect, useState } from "react";
import "../../styles/fonts.css";

const Page = () => {
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    setQuerySearch(window?.location?.search?.split("?")[1]);

  }, []);

  return (
    <BodyComponent>
      <FiltersResultsComponent querySearch={querySearch} />
    </BodyComponent>
  );
};

export default Page;
