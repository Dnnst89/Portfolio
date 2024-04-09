"use client";
import DetailComponent from "@/components/DetailComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/fonts.css";


export default function GetDetail() {
  const [detailId, setDetailId] = useState(null);
  const router = useRouter();

 
  const handleGoBack = () => {
    router.back(); // Función para regresar a página anterior
  };

  const handleGoToCategory =(category) => {
    router.push(`/filtersResults/?category=${category}`); //Función para regresar a la categoría respectiva
    
  }

  useEffect(() => {
    const id = window?.location?.search?.split("=")[1];
    setDetailId(id);

  }, []);
  return (
    <section>
      <DetailComponent id={detailId} handleGoBack={handleGoBack} handleGoToCategory={handleGoToCategory} />
    </section>
  );
}
