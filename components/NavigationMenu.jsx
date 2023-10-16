import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
const NavidationMenu = () => {
  const [isSelected, setIsSelected] = useState(null);
  const selectedStyle =
    "bg-pink-200 rounded-full  text-resene p-1 text-2xl mb-2 sm:p-1 sm:text-2xl md:p-1 md:text-2xl lg:p-2 lg:text-4xl";
  const nonSelectedStyle =
    "bg-black rounded-full text-resene mb-2 p-1 text-2xl sm:p-1 sm:text-2xl md:p-1 md:text-2xl lg:p-2 lg:text-4xl ";
  const handleItemClick = (id) => {
    if (isSelected === id) {
      // Si se hace clic nuevamente en el mismo elemento, deselecciona
      setIsSelected(null);
    } else {
      setIsSelected(id);
    }
  };
  return (
    <div className="border-t-4 border-pink-200 p-3 space-y-4 bg-resene h-[250px] mb-5 col-start-2 col-span-10 md:col-start-3 md:col-span-3 md:mr-5">
      <Link
        href={"/personalData"}
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
        className={`border-b-2 border-dashed border-grey-200 flex items-center justify-between  ${
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
        href={"/address"}
        className={`border-b-2 border-dashed border-grey-200 flex items-center justify-between  ${
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
        <button className="bg-pink-200 text-white p-2 sm:p-1 md:p-1 md:text-sm rounded-sm">
          CERRAR SESIÓN
        </button>
      </div>
    </div>
  );
};
export default NavidationMenu;
