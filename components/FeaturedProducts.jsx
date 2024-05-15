import FilterProductCard from "./FilterProductCard";
import { useLazyQuery } from "@apollo/client";
import GET_FEATURED_PRODUCTS from "@/src/graphQl/queries/getFeaturedProducts";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, A11y } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);  
  const [showError, setShowError] = useState(false);
  const [getFeatureProducts] = useLazyQuery(GET_FEATURED_PRODUCTS);
  const [GetErrorInfo] = useLazyQuery(GET_ERROR_INFO, {
    variables: { id: 1 },
  });
  const [auxProducts, setAuxProducts] = useState([]);

  const getTopProducts = async () => {
    try {
      const { error, data } = await getFeatureProducts();
      const { data: errorMessage } = await GetErrorInfo({ variables: { id: 1 } });

      if (error) {
        const message = errorMessage?.errorInformation?.data?.attributes?.error_message;
        setShowError(true);
        // const errorMsg = message || "Lo sentimos, ha ocurrido un error al cargar los datos";
        // toast.error(errorMsg, { autoClose: 5000 });
        setLoading(false);
        return;
      }

      const max = data?.products?.data?.length || 0;
      const myArray = [];
      while (myArray.length < max) {
        const num = Math.floor(Math.random() * max);
        if (!myArray.includes(num)) {
          myArray.push(num);
        }
      }

      const selectedProducts = myArray.slice(0, 20).map(index => data?.products?.data[index]);
      setAuxProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", { autoClose: 5000 });
    }
  };

  useEffect(() => {
    getTopProducts();
  }, []);

  if (loading || auxProducts.length ==0) {
    return <div></div>; // to not show the Top de productos title when is loading or there're not records in DB
  }

  if (showError) {// to not show the Top de productos title when there's an error in the GRAPHQL request.
    return '';
  }

  return (
    <>
      <div className="flex justify-center pt-10">
        <h1>Top de productos</h1>
      </div>
      
      <Swiper
        loop={true}
        modules={[EffectCoverflow, Navigation, A11y]}
        effect="coverflow"
        navigation
        coverflowEffect={{
          rotate: -15,
          depth: 50,
          slideShadows: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {auxProducts.map((item) => (
          <div role="link" key={item.id} style={{ pointerEvents: "auto" }}>
            <SwiperSlide key={item.id}>
              <FilterProductCard
                id={item.id}
                name={item.attributes?.name}
                coverImage={item.attributes?.coverImage?.data}
                defaultPrice={item.attributes?.defaultPrice?.toFixed(2)}
                brand={item.attributes?.brand}
                initialAge={item.attributes?.variants?.data[0]?.attributes?.initialAge}
                finalAge={item.attributes?.variants?.data[0]?.attributes?.finalAge}
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedProducts;
