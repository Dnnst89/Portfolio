"use client";
import Image from "next/image";

const loader = ({ src }) => {
  return `http://localhost:1337${src}`;
};

const ProductCard = ({ name, defaultPrice, url }) => {
  return (
    <div className="m-4 max-w-sm rounded-[15px] shadow-lg w-[300px] h-[450px] transition-transform transform hover:scale-105 hover:bg-resene duration-1000 hover:cursor-pointer">
      <div className="w-[280px] h-[280px] mx-auto p-1">
        <a href="#">
           <Image
          loader={loader}
          priority={true}
          width="600"
          height="500"
          src={url}
          alt="tailwind logo"
          className="rounded-[15px]"
        />
        </a>
      </div>

      <div className="px-5 pb-5">
        <a href="#">
          <h5
            className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: name,
            }}
          ></h5>
        </a>

        <div className="pt-3 rounded-lg">
          <h1 className="font-bold text-gray-900 dark:text-white ">
            Nombre largo de este producto
          </h1>
          <h2 className="flex justify-end p-3 relative">
            <a href="#" className=" text-sm ">
              Nombre de marca
            </a>
          </h2>
        </div>
      </div>

      <div className="bg-aquamarine w-100 h-[15.6%] text-lg rounded-b-[15px] font-bold flex justify-center">
        <button className="hover:underline text-white">₡{defaultPrice}</button>
      </div>
    </div>
  );
};

export default ProductCard;
