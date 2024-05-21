"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import trackEvent from "../helpers/analytics.js";
import useStoreInformation from "../helpers/useStoreInformation";
import { useLocalCurrencyContext } from "@/src/context/useLocalCurrency";

const FilterProductCard = ({
  id,
  name,
  price,
  localCurrencyPrice,
  coverImage,
  brand,
  initialAge,
  finalAge,
}) => {
  // if true send LocalCurrencyPrice as price for products else send variant price
  const useLocalCurrency = useLocalCurrencyContext();

  const altTextDesc = "Imagen Producto " + name;
  const router = useRouter();
  const productChange = () => {
    trackEvent(
      brand,
      "click_on_product",
      name,
      localCurrencyPrice,
      initialAge,
      finalAge
    );
    window.location.href = `/detail/?id=${id}`;
  };

  const { storeInformation, storeInformationError } = useStoreInformation(1);
  const currencySymbol =
    storeInformation?.storeInformation?.data?.attributes?.currencySymbol;

  return (
    <div
      role="button"
      onClick={productChange}
      className="m-4 max-w-sm rounded-[15px] drop-shadow-card w-[145px] h-[225px] md:w-[240px] md:h-[360px] transition-transform transform hover:scale-105 hover:bg-floralwhite bg-resene duration-1000 hover:cursor-pointer"
    >
      <div className="w-full mx-auto p-1 md:p-2">
        <div href="#">
          <Image
            priority={true}
            width="225"
            height="225"
            src={
              coverImage
                ? `${coverImage.attributes.url}`
                : `https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/undefined_76582dee58.png`
            }
            alt={altTextDesc}
            className="rounded-[15px] h-[137px] md:h-[225px]"
          />
        </div>
      </div>

      <div className="px-4 pb-5">
        <h2 className="h-[25px] md:h-[40px] text-[10px] md:text-base   font-semibold  leading-3 tracking-normal mt-2 tracking-tight text-[#484848] w-6/7">
          {name}
        </h2>
        <div className=" rounded-lg">
          <h3 className="flex justify-end  relative">
            <div
              href="#"
              className="px-1 pt-1 text-[9px] md:text-xs  text-[#282828]"
            >
              {brand}
            </div>
          </h3>
        </div>
      </div>

      <div className="bg-aquamarine text-xs md:text-lg rounded-b-[15px] font-bold flex justify-center absolute bottom-0 left-0 right-0 hover:underline text-white p-1">
        {useLocalCurrency
          ? `${currencySymbol} ${parseFloat(localCurrencyPrice).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              }
            )}`
          : `$ ${parseFloat(price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`}
      </div>
    </div>
  );
};

export default FilterProductCard;
