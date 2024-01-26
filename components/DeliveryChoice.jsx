import Image from "next/image";
import Spinner from "./Spinner";

export const DeliveryChoice = ({
  onSubmit,
  register,
  handleSubmit,
  logo,
  labelName,
  valueName,
}) => {
  console.log("register", labelName);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-center mt-5 space-y-10">
        <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
          <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
            <input
              type="radio"
              id="pickUpInStore"
              name="del_method"
              value={valueName}
              className="w-5 h-5"
              defaultChecked={valueName === "Recoger en tienda" ? true : false}
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
        {/* <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
          <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
            <input
              type="radio"
              id="moovin"
              name="del_method"
              value="Envío a través de MOOVIN"
              className="w-5 h-5"
              {...register("deliveryMethod")}
            />
          </div>
          <div className="items-center pl-5 md:pl-[90px] md:flex">
            <label className="text-sm md:text-xl md:tracking-wider">
              Envío a través de:
            </label>
            <Image
              src={moovin}
              alt=""
              style={{ width: "auto", height: "65px" }}
              className="max-h-[50px] md:max-h-[50px] m-auto md:ml-20 py-2"
            />
          </div>
        </section> */}
      </div>
    </form>
  );
};
