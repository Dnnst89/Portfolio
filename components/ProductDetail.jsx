"use client";
import { useState } from "react";
import Image from "next/image";
import { BiPlus, BiMinus } from "react-icons/bi";
import Link from "next/link";
import AddItemBtn from "./AddItemBtn";
import ProductImage from "./ProductImage";
import ProductFeatures from "./ProductFeatures"
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

function ProductDetail({ name, brand, description, variants, materials }) {

  const altText= "Imagen de producto" + name
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  let shortDescrption = "";
  const [images, setImages] = useState(variants.length > 0 ? variants[0].attributes.images.data : null);
  const { user } = useStorage();
  const cartSummary = useCartSummary({ userId: user?.id }); //me trae  {total,items,quantity,error,sessionId}



  const decreaseCounter = () => {
    if (quantity === 1) return;
    setQuantity((prev) => --prev);
  };

  const increaseCounter = async () => {
    const itemFiltrado = await cartSummary.items.find(
      (item) => item.attributes.variant.data.id === variants[0]?.id
    );
    if (itemFiltrado) {
      //si el item ya esta en carrito
      if (variants.length > 0) {
        if (
          quantity >=
          variants[0].attributes.stock - itemFiltrado.attributes.quantity
        )
          return;
        setQuantity((prev) => ++prev);
      }
    } else {
      if (variants.length > 0) {
        if (quantity >= variants[0].attributes.stock) return;
        setQuantity((prev) => ++prev);
      }
    }
  };
  const handleClick = () => {
    // Find the element you want to scroll to
    const element = document.querySelector("#detail-table");

    // Scroll to the element
    element.scrollIntoView({ behavior: "smooth" });
  };
  if (description != null) {
    shortDescrption = description.split(" ").splice(0, 20).join(" ");
  }

  const chanceImage = (image) => {
    setImage(image)
  };

  return (
    <>
      <section aria-label="Descripción del producto" className="bg-floralwhite max-w-screen-xl grid grid-cols-12 m-auto p-5 z-0" target="_blank" rel="noopener noreferrer">

        {/* Columna de imagenes */}
        <section aria-label="Imágenes del producto" className="mb-10 col-span-12 md:col-span-6">
          {/* imagen principal grande */}
          <div className="m-auto w-full flex justify-center">
            {images.length > 0 ? (
              <Image
                {...image == null ? setImage(images[0].attributes.url) : null}
                src={image}
                width={"450"}
                height={"800"}
                className={"rounded-xl mx-2"}
                alt={altText}
              />
            ) : null}
          </div>
          {/* //imagenes debajo de la principal */}
          <div className="md:w-4/6 m-auto mt-2 ">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={1}
              slidesPerView={3}
              navigation

            >
              {images
                ? images.map((item) => {
                  return (
                    <div key={item.id}>
                      <SwiperSlide key={item.id}>
                        <button onClick={() => chanceImage(item.attributes.url)}>
                          <Image
                            priority={true}
                            src={item.attributes.url}
                            width={"125"}
                            height={"100"}
                            className={"rounded-xl"}
                            alt={name}
                          />
                        </button>
                      </SwiperSlide>
                    </div>
                  );
                })
                : null}
            </Swiper>


          </div>

        </section>

        {/* Sección con los detalles del producto*/}
        <section aria-label="Detalles del producto" className="mb-10 col-span-12 md:col-span-6 m-auto">
          <h2 aria-label={`Referencia del producto ${variants[0]?.attributes?.sku}`} className="flex justify-end text-sm">Ref {variants[0]?.attributes?.sku}</h2>
          <h1 aria-label={`Nombre del producto ${name}`} className="mb-3 text-xl font-bold">{name}</h1>
          <p>{shortDescrption}...</p>
          <a onClick={() => handleClick()}>
            <button className="flex justify-start text-lightblue mb-3 bg-blue-500 transition duration-200 opacity-60 hover:opacity-100">
              Leer mas
            </button>
          </a>
          {/* Sección seleccion del producto*/}
          <section>
                <ProductFeatures
                variantsList={variants}
                setImages={setImages}
                setImage={setImage}
                />
          </section>

          {/* imagenes iconos y caracteristicas */}
          <div className="flex grid grid-cols-12 gap-2 w-full justify-items-stretch ">

            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Tipo de material : <br />
                {materials.length > 0 ? materials[0].attributes.name : null}
              </p>
            </div>
            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Rango de edades:
                <br />
                {variants.length > 0
                  ? variants[0].attributes.ageRange
                  : null}
              </p>
            </div>
            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Color:
                <span className="m-2">
                  {variants.length > 0
                    ? variants[0].attributes.color
                    : null}
                </span>
              </p>
            </div>
            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Stock:
                <span className="m-2">
                  {variants.length > 0
                    ? variants[0].attributes.stock
                    : null}
                </span>
              </p>
            </div>
            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Tamaño:
                <span className="m-2">
                  {variants.length > 0 ? variants[0].attributes.size : null}
                </span>
              </p>
            </div>
            <div className="col-span-6 flex mt-5 items-center">
              <Image
                priority={true}
                width="50"
                height="50"
                src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/characteristics_image_dca6a00cc3.png`}
                alt="tailwind logo"
                className="rounded-xl mr-3"
              />
              <p className="text-sm md:text-base">
                Peso:
                <span className="m-2">
                  {variants.length > 0 &&
                    variants[0].attributes.weight != null
                    ? variants[0].attributes.weight.weight + " " +
                    variants[0].attributes.weight.unitWeight
                    : null}
                </span>
              </p>
            </div>


          </div>
          {/* precio, cantidad y carrito */}
          <div className="col-span-12 grid grid-cols-12  md:flex items-center justify-between  p-4">
            <span className="col-span-5 font-bold md:text-[30px]">
              $ {variants.length > 0 ? variants[0].attributes.price : null}
            </span>
            <div className="col-span-7 md:flex md:flex-col items-end md:items-end p-3">
              <div className="flex items-center mb-2 ">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                  <button aria-label="Disminuir cantidad de produto" className=" bg-grey-100 rounded-full text-white">
                    <BiMinus onClick={decreaseCounter} />
                  </button>
                  <span>{quantity}</span>
                  <button aria-label="Aumentar cantidad de produto" className=" bg-grey-100 rounded-full  text-white">
                    <BiPlus onClick={increaseCounter} />
                  </button>
                </div>
              </div>
              <div className="bg-aquamarine rounded-sm p-2 md:p-3  md:mx-4">
                <AddItemBtn
                  quantityItem={quantity}
                  variant={variants[0]}//momentaneamente solo le enviamos una variante
                  cartItems={cartSummary.items}
                  cartQuantity={cartSummary.quantity}
                  sessionId={cartSummary.sessionId}
                  user={user}
                />
              </div>
            </div>
          </div>
        </section>



      </section>
    </>
  );
}
export default ProductDetail;
