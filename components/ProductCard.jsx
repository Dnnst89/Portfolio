"use client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, name, defaultPrice, coverImage, brand, url }) => {
  const altTextDesc="Imagen Producto " + name
  return (
    <Link role="link" href={{ pathname: "/detail", query: { id } }}>
      <div className="m-4 max-w-sm rounded-[15px] drop-shadow-card w-[145px] h-[225px] md:w-[240px] md:h-[360px] transition-transform transform hover:scale-105 hover:bg-floralwhite bg-resene duration-1000 hover:cursor-pointer">
        <div className="w-full mx-auto p-1 md:p-2">
          <div href="#">
            <Image
              priority={true}
              width="225"
              height="225"
              src={
                coverImage
                  ? `${coverImage.url}`
                  : `https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/undefined_76582dee58.png`
              }
              alt={altTextDesc}
              className="rounded-[15px] h-[137px] md:h-[225px]"
            />
          </div>
        </div>

        <div className="px-4 pb-5">
          <h2 className="h-[25px] md:h-[40px] text-[10px] md:text-base   font-semibold  leading-3 tracking-normal mt-2 tracking-tight text-[#484848] w-6/7"
          >
            {name}
          </h2>

          <div className=" rounded-lg">
            <h3 className="flex justify-end  relative">
              <div href="#" className="px-1 pt-1 text-[9px] md:text-xs  text-[#282828]">
                {brand}
              </div>
            </h3>
          </div>
        </div>

        <div className="bg-aquamarine text-xs md:text-lg rounded-b-[15px] font-bold flex justify-center absolute bottom-0 left-0 right-0">
          <div className="hover:underline text-white p-1">
            $ {defaultPrice}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
