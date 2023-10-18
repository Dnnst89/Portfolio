"use client";
import DetailComponent from "@/components/DetailComponent";
import { useEffect, useState } from "react";
import "../../styles/fonts.css";


export default function GetDetail() {
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    const id = window?.location?.search?.split("=")[1];
    setDetailId(id);
  }, []);
  return (
    <main>
      <DetailComponent id={detailId} />
    </main>
  );
}
