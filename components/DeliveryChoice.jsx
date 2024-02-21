/**
 * Componente que muestra los metodos de entrega disponibles
 * por la aplicación
 */
import Image from "next/image";

export const DeliveryChoice = ({
  register,
  logo,
  labelName,
  valueName,
  deliveryId,
  blockMoovin,
  className,
  text,
}) => {
  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-5">
      <section
        className={`${
          blockMoovin ? "bg-[#e9ecef]" : "bg-white"
        } w-3/4 flex rounded-t-3xl drop-shadow-lg text-xl`}
      >
        {/* TODO: seleccionar correos de costa rica si moovin no esta disponible */}
        <div className="border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
          <input
            type="radio"
            id={deliveryId}
            name="del_method"
            value={valueName}
            className={`${
              blockMoovin ? className : null
            } w-5 h-5 cursor-pointer`}
            disabled={blockMoovin}
            defaultChecked={
              blockMoovin ? valueName === "CCR" : valueName === "SPU"
            }
            {...register("deliveryMethod")}
          />
        </div>
        <div className="items-center pl-5 md:pl-[90px] md:flex ">
          <label className="text-sm md:text-xl md:tracking-wider">
            {labelName}
          </label>
          <Image
            src={logo}
            alt=""
            style={{ width: "auto", height: "65px" }}
            className="m-auto md:ml-20 py-2"
          />
        </div>
      </section>
      {blockMoovin ? <p className="text-sm text-orange mt-0">{text}</p> : null}{" "}
      {/* Adjusted margin top value */}
    </div>
  );
};
