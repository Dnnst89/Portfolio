"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const AgeProductCard = ({ id, name, defaultPrice, coverImage, brand }) => {
  const router = useRouter();
  const productChange = () => {
    router.push(`/detail${id}`); // Reemplaza '/nueva-pagina' con la ruta de la página a la que deseas navegar.
  };

  // onClick={productChange}

  return (
    <Link href={{ pathname: "/detail", query: { id } }}>
      <div className="m-4 max-w-sm rounded-[15px] drop-shadow-card w-[145px] h-[225px] md:w-[240px] md:h-[360px] transition-transform transform hover:scale-105 hover:bg-floralwhite bg-resene duration-1000 hover:cursor-pointer">
        <div className="w-full mx-auto p-1 md:p-2">
          <div href="#">
            <Image
              priority={true}
              width="235"
              height="235"
              src={
                coverImage
                  ? `${coverImage.attributes.url}`
                  : `https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/undefined_76582dee58.png`
              }
              alt="tailwind logo"
              className="rounded-[15px]"
            />
          </div>
        </div>

        <div className="px-4 pb-5">
          <h5 className="md:h-[40px]   text-[10px] md:text-base   font-semibold  leading-3 tracking-normal mt-2 tracking-tight text-[#484848] dark:text-white w-6/7"
          >
            {name}
          </h5>
          <div className=" rounded-lg">
            <h2 className="flex justify-end  relative">
              <div href="#" className="px-1 pt-1 text-[7px] md:text-xs  text-[#757575]">
                {brand}
              </div>
            </h2>
          </div>
        </div>

        <div className="bg-aquamarine text-xs md:text-lg rounded-b-[15px] font-bold flex justify-center absolute bottom-0 left-0 right-0">
          <button className="hover:underline text-white p-1">
            $ {defaultPrice}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default AgeProductCard;
