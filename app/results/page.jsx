"use client";
import ResultsComponent from "@/components/ResultsComponent";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import "../../styles/fonts.css";
import FilterResultsCategories from "@/components/FilterResultsCategories";

const GetResults = () => {
  const [querySearch, setQuerySearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuerySearch(window?.location?.search?.split("=")[1]);
    setLoading(false);
  }, []);

  return (
    <>
      <div className={loading ? "grid place-items-center" : ""}>
        {/* con algolia */}
        {loading ? <Spinner /> : <ResultsComponent query={querySearch || ""} />}
        {/* con strapi */}
        {/* {loading ? <Spinner /> : <FilterResultsCategories category={querySearch || ""} />} */}
      </div>
    </>
  );
};

export default GetResults;
