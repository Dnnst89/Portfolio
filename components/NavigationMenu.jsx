import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function () {
  const [isSelected, setIsSelected] = useState(null);
  const selectedStyle =
    "bg-pink-200 rounded-full p-2 text-4xl text-resene mb-2";
  const nonSelectedStyle =
    "bg-black rounded-full p-2 text-4xl text-resene mb-2";
  const handleItemClick = (id) => {
    if (isSelected === id) {
      // Si se hace clic nuevamente en el mismo elemento, deselecciona
      setIsSelected(null);
    } else {
      setIsSelected(id);
    }
  };
  return (
    <div className="border-t-4 border-pink-200 w-1/6 p-3 space-y-4 bg-resene h-[250px]">
      <Link
        href={""}
        className={`border-b-2 border-dashed border-grey-200 flex justify-between items-center ${
          isSelected === "datos" ? "text-pink-200" : ""
        }`}
      >
        Datos de usuario
        <FaArrowRight
          className={isSelected === "datos" ? selectedStyle : nonSelectedStyle}
          onClick={() => handleItemClick("datos")}
        />
      </Link>

      <Link
        href={"/order"}
        className={`border-b-2 border-dashed border-grey-200 flex items-center justify-between ${
          isSelected === "pedidos" ? "text-pink-200" : ""
        }`}
      >
        Pedidos
        <FaArrowRight
          className={
            isSelected === "pedidos" ? selectedStyle : nonSelectedStyle
          }
          onClick={() => handleItemClick("pedidos")}
        />
      </Link>

      <Link
        href={""}
        className={`border-b-2 border-dashed border-grey-200 flex items-center justify-between ${
          isSelected === "direcciones" ? "text-pink-200" : ""
        }`}
      >
        Direcciones
        <FaArrowRight
          className={
            isSelected === "direcciones" ? selectedStyle : nonSelectedStyle
          }
          onClick={() => handleItemClick("direcciones")}
        />
      </Link>

      <div className="flex justify-center">
        <button className="bg-pink-200 text-white p-2 rounded-sm">
          CERRAR SESIÓN
        </button>
      </div>
    </div>
  );
}
