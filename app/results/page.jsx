"use client";
import ResultsComponent from "@/components/ResultsComponent";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import "../../styles/fonts.css";

const GetResults = () => {
  const [querySearch, setQuerySearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugger;
    setQuerySearch(window?.location?.search?.split("=")[1]);
    setLoading(false);
  }, []);

  return (
    <>
      <div className={loading ? "grid place-items-center" : ""}>
        {loading ? <Spinner /> : <ResultsComponent query={querySearch || ""} />}
      </div>
    </>
  );
};

export default GetResults;
