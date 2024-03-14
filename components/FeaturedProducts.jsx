"use client";

import FilterProductCard from "./FilterProductCard";
//GQL
import { useQuery } from "@apollo/client";
import GET_FEATURED_PRODUCTS from "@/src/graphQl/queries/getFeaturedProducts";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import toast, { Toaster } from "react-hot-toast";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { useState } from "react";

const FeaturedProducts = () => {
  //GQL
  const { loading, error, data } = useQuery(GET_FEATURED_PRODUCTS);
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 1 },
  });

  const [showError, setShowError] = useState(false);
  const message =
    errorMessage?.errorInformation?.data?.attributes?.error_message;
  if (loading) return "Loading...";
  if (!error && !loading && !showError) {
    if (message !== undefined) {
      setShowError(true);

      return toast.error(
        errorMessage?.errorInformation?.data?.attributes?.error_message,
        {
          autoClose: 5000,
        }
      );
    } else {
      alert("sdfasdf");
      setShowError(true);

      return toast.error(
        "Lo sentimos, ha ocurrido un error al cargar los datos",
        {
          autoClose: 5000,
        }
      );
    }
  }

  const max = data?.products.data.length;
  const myArray = [];
  while (myArray.length < max) {
    var num = Math.floor(Math.random() * max);
    var exist = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == num) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      myArray[myArray.length] = num;
    }
  }

  //tomamos los primeros veinte resultados del random anterior
  const aux = [];
  for (let i = 0; i <= 20; i++) {
    if (i < myArray.length) {
      const random = myArray[i];
      aux.push(data?.products.data[random]);
    }
  }

  return (
    <>
      <Swiper
        loop={true}
        modules={[EffectCoverflow, Navigation, A11y]}
        effect="coverflow"
        //slidesPerView={4}
        //spaceBetween={-200}
        navigation
        coverflowEffect={{
          rotate: -15,
          //stretch: 0,
          depth: 50,
          slideShadows: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            //spaceBetween: 1000
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            //spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            //spaceBetween: 40
          },
        }}
      >
        {aux
          ? aux.map((item) => {
              return (
                <div
                  role="link"
                  key={item.id}
                  style={{ pointerEvents: "auto" }}
                >
                  <SwiperSlide key={item.id}>
                    <FilterProductCard
                      key={item.id}
                      id={item.id}
                      name={item.attributes.name}
                      coverImage={item.attributes.coverImage.data}
                      defaultPrice={item.attributes.defaultPrice.toFixed(2)}
                      brand={item.attributes.brand}
                    />
                  </SwiperSlide>
                </div>
              );
            })
          : null}
      </Swiper>
    </>
  );
};

export default FeaturedProducts;
