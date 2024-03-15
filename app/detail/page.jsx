"use client";
import DetailComponent from "@/components/DetailComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/fonts.css";


export default function GetDetail() {
  const [detailId, setDetailId] = useState(null);
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Función para regresar
  };

  useEffect(() => {
    const id = window?.location?.search?.split("=")[1];
    setDetailId(id);
  }, []);
  return (
    <section>
      {/* <button
                  onClick={() =>
                    router.back()
                  }
                  // className="bg-pink-200 text-white rounded-sm p-2 w-[150px]"
                >
                 <BiArrowBack />
       </button> */}
      <DetailComponent id={detailId} handleGoBack={handleGoBack} />
    </section>
  );
}
