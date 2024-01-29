import Image from "next/image";
import Spinner from "./Spinner";

export const DeliveryChoice = ({
  register,
  logo,
  labelName,
  valueName,
  deliveryId,
}) => {
  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-10">
      <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
        <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
          <input
            type="radio"
            id={deliveryId}
            name="del_method"
            value={valueName}
            className="w-5 h-5"
            /*
              Se consulta el tipo de envio desde el backend
              (CCR/SPU/MVN)
            */
            defaultChecked={valueName === "SPU" ? true : false}
            {...register("deliveryMethod")}
          />
        </div>
        <div className="items-center pl-5 md:pl-[90px] md:flex">
          <label className="text-sm md:text-xl md:tracking-wider">
            {labelName}
          </label>
          <Image
            src={logo}
            alt=""
            style={{ width: "auto", height: "65px" }}
            className="m-auto md:ml-20 py-2"
            defaultChecked
            {...register("deliveryMethod")}
          />
        </div>
      </section>
    </div>
  );
};
