"use client";
import BasicAddressComponent from "@/components/BasicAddressComponent";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import Spinner from "@/components/Spinner";

export default function Address() {

  const { user } = useStorage();
  const userId = user?.id;

  if (!userId) {
    return <div className="  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-8">
      <h1 className="flex justify-center mt-3 text-xl  md:col-span-2">Cargando</h1>
      <Spinner />
    </div>;
  }

  return (
    <section>
      <BasicAddressComponent id={userId} />
    </section>
  );
}

