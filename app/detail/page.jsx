"use client";
import DetailComponent from "@/components/DetailComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/fonts.css";


export default function GetDetail() {
  const [detailId, setDetailId] = useState(null);
  const [previousPage, setPreviousPage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setPreviousPage(document.referrer);
    
  }, []);
  const handleGoBack = () => {
    if (previousPage.includes("/filtersResults")) { // Verificar si la página anterior contiene /filtersResults
      localStorage.setItem('navigatedFromFiltersResultsComponent', 'true'); //activar la bandera para el FiltersResultsComponent
    }
    const navigatedFromResult = localStorage.getItem('navigatedFromResult');
     if (navigatedFromResult) {
    localStorage.setItem('navigatedFromResultsComponent', 'true');//activar la bandera para el ResultsComponent
    }
    router.back(); // Función para regresar
  };

  useEffect(() => {
    const id = window?.location?.search?.split("=")[1];
    setDetailId(id);

  }, []);
  return (
    <section>
      <DetailComponent id={detailId} handleGoBack={handleGoBack} />
    </section>
  );
}
