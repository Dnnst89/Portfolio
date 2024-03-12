"use client";
import FiltersResultsComponent from "@/components/FiltersResultsComponent";
import BodyComponent from "@/components/BodyComponent";
import { useEffect, useState } from "react";
import "../../styles/fonts.css";

const Page = () => {
  try {
    const [querySearch, setQuerySearch] = useState("");

    useEffect(() => {
      setQuerySearch(window?.location?.search?.split("?")[1]);
    }, []);

    return (
      <BodyComponent>
        <FiltersResultsComponent querySearch={querySearch} />
      </BodyComponent>
    );
  } catch (error) {
    toast.error(
      "Lo sentimos, ha ocurrido un error al actualizar la información",
      {
        autoClose: 5000,
      }
    );
  }
};

export default Page;
