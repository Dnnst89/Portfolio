"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BiPlus, BiMinus, BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import AddItemBtn from "./AddItemBtn";
import ProductImage from "./ProductImage";
import ProductFeatures from "./ProductFeatures";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ImageGallery from "react-image-gallery";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { useQuery } from "@apollo/client";
import GET_VARIANT_BY_ID from "@/src/graphQl/queries/getVariantByID";
import GET_CART_ITEM_BY_ID from "@/src/graphQl/queries/getCartItemById";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

function ProductDetail({ product, variantId, ItemQt, handleGoBack , handleGoToCategory}) {
  const name = product?.attributes?.name;
  const brand = product?.attributes?.brand;
  const description = product?.attributes?.description;
  const variants = product?.attributes?.variants?.data;
  const materials = product?.attributes?.materials?.data;
  const category = product?.attributes?.categories?.data[0]?.attributes?.name;
  const categoryData = product?.attributes?.categories?.data;
  let previousPage = "";
  let prevCategory = "";



  const { data, loading: productIdLoading } = useQuery(GET_VARIANT_BY_ID, {
    variables: {
      id: variantId,
    },
  });

  //variables para cargar los datos en el detalle del producto desde en carrito
  const lastVariantSelected = data?.variant?.data;
  const skuSelected = data?.variant?.data?.attributes?.sku;
  const stockVariantSelected = data?.variant?.data?.attributes?.stock;
  const ageRangeVariantSelected = data?.variant?.data?.attributes?.ageRange;
  const priceVariantSelected = data?.variant?.data?.attributes?.price;
  const sizeVariantSelected = data?.variant?.data?.attributes?.size;
  const imageVariantSelected = data?.variant?.data?.attributes?.images?.data;
  const colorTypeParentVariant =
    data?.variant?.data?.attributes?.parentVariant?.data?.attributes?.type;
  const colorValueParentVariant =
    data?.variant?.data?.attributes?.parentVariant?.data?.attributes?.typeValue;
  const colorTypeVariant = data?.variant?.data?.attributes?.type;
  const colorValueVariant = data?.variant?.data?.attributes?.typeValue;

  
    previousPage = document.referrer;
    const url = new URL(previousPage);
    const params = new URLSearchParams(url.search);
    const previousCategory = params.get("category");
    prevCategory = previousCategory;
    
    // Verificar si prevCategory existe en el array de categorías
    const isPrevCategoryExist = categoryData.some(item => {
      const categoryName = item.attributes.name.trim(); // Eliminar espacios en blanco al final
      return categoryName === prevCategory;
    });

   
  //variable para guardar las selecciones de dropdown para mostrar en el detalle del pedido desde el carrito
  const featuresSelected = {};
  if (
    colorTypeParentVariant !== undefined &&
    colorValueParentVariant !== undefined
  ) {
    featuresSelected[colorTypeParentVariant] = colorValueParentVariant;
  }

  // Agregar propiedades solo si colorTypeVariant y colorValueVariant no son indefinidos
  if (colorTypeVariant !== undefined && colorValueVariant !== undefined) {
    featuresSelected[colorTypeVariant] = colorValueVariant;
  }

  const altText = "Imagen de producto" + name;
  const [quantity, setQuantity] = useState(1);
  const [quantitySelected, SetQuantitySelected] = useState(ItemQt); //carga la cantidad seleccionada

  const [image, setImage] = useState(null);
  let shortDescrption = "";
  const allImages = [];

  const baseURL = process.env.NEXT_PUBLIC_URL_DETINMARIN_BUCKET_IMAGES;
  const { user } = useStorage();
  const cartSummary = useCartSummary({ userId: user?.id }); //me trae  {total,items,quantity,error,sessionId}
  const [variantSelected, setvariantSelected] = useState(); //guarda la variante que actualmente se seleccionó{features:{}, variant:{object}}
  const [price, setPrice] = useState(
    variants.length > 0 ? variants[0].attributes.price.toFixed(2) : null
  ); //precio inicial dado por primer variante
  const [enableButton, setEnableButton] = useState(variants.length <= 1);
  let variantItems = [];

  const { data: storeInformation, error: storeInformationError } = useQuery(
    GET_STORE_INFO,
    {
      variables: {
        id: 1,
      },
    }
  );

  useEffect(() => {
    if (data && data.variant && data.variant.data) setEnableButton(false);
  }, [data]);

  const currency =
    storeInformation?.storeInformation?.data?.attributes?.currency;
  if (imageVariantSelected) {
    allImages.push(...imageVariantSelected); //muestra solo las imagenes de la variante(detalle del producto desde carrito)
  } else {
    variants.forEach((variant) => {
      if (variant.attributes.images && variant.attributes.images.data) {
        allImages.push(...variant.attributes.images.data);
      }
    });
  }

  const [images, setImages] = useState(allImages.length > 0 ? allImages : null);
  //galeria de imagenes para componente se compone de un arreglo [{original: url, thumbnail: url}]
  const [galleryImages, setGalleryImages] = useState([]);

  const itemFiltrado =  cartSummary.items.find(
    (item) => item.attributes.variant.data.id === variantId
    
  );
  
  useEffect(() => {
    if (imageVariantSelected) {
      const variantGalleryImages = imageVariantSelected.map((image) => ({
        original: image.attributes?.url,
        thumbnail: image.attributes?.url,
      }));
      setGalleryImages(variantGalleryImages);
    } else {
      const newGalleryImages = images?.map((image) => ({
        original: image.attributes.url,
        thumbnail: image.attributes.url,
      }));
      setGalleryImages(newGalleryImages);
    }
  }, [images, imageVariantSelected]);

  const decreaseCounter = () => {
    if (ItemQt) {
      if (quantitySelected > 1) {
        const updatedQuantity = quantitySelected - 1;
        SetQuantitySelected(updatedQuantity);
        const itemFiltrado = cartSummary.items.find(
          (item) => item.attributes.variant.data.id === variantId
        );
        if (itemFiltrado) {
        if (updatedQuantity === itemFiltrado?.quantity) {
          setEnableButton(false);
        } else {
          setEnableButton(true);
        }
      }
      } else {
        // Evitar decrementar por debajo de 1
        SetQuantitySelected(1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (ItemQt) {
      if (quantitySelected == newQuantity) return; //controla dropdown (detalle del producto desde carrito)

      const itemFiltrado = await cartSummary.items.find(
        (item) => item.attributes.variant.data.id === variantId
      );
      const isQuantityEqualToItemQt =
        newQuantity === itemFiltrado?.quantity;

      // Establecer el botón habilitado o deshabilitado basado en la comparación
      setEnableButton(!isQuantityEqualToItemQt);

      // Establecer la cantidad seleccionada
      SetQuantitySelected(newQuantity);
    } else {
      const itemFiltrado = await cartSummary.items.find(
        (item) => item.attributes.variant.data.id === variants[0]?.id
      );
      if (itemFiltrado) {
        //si el item ya esta en carrito
        if (variants.length > 0) {
          if (quantity >= newQuantity) return;
          setQuantity(newQuantity);
        }
      } else {
        if (variants.length > 0) {
          if (quantity >= variants[0].attributes.stock) return;
          setQuantity(newQuantity);
        }
      }
    }
  };

  const increaseCounter = async () => {

    if (ItemQt) {
      if (quantitySelected >= stockVariantSelected) return;
      const updatedQuantity = parseInt(quantitySelected, 10) + 1;

      SetQuantitySelected(updatedQuantity);
      // const itemFiltrado = await cartSummary.items.find(
      //   (item) => item.attributes.variant.data.id === variantId
        
      // );
      if (itemFiltrado) {
      if (updatedQuantity === itemFiltrado?.quantity) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }
    } else {
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
    setImage(image);
  };

  //cuando el producto solo tiene una capa de variante, obtengo el variants[0]
  {
    data && data.variant && data.variant.data
      ? (() => {
          variantItems = [
            {
              size: data?.variant?.data?.attributes?.size,
              ageRange: data?.variant?.data?.attributes?.ageRange,
            },
          ];
        })()
      : (() => {
          variantItems = variants.map((variant) => {
            const { size, price, color, stock, ageRange } = variant.attributes;
            return { size, ageRange };
          });
        })();
  }

  const keyTranslations = {
    size: "Tamaño",
    stock: "Existencias",
    ageRange: "Rango de edad",
  };
  const variantItem = variantItems[0];

  return (
    <>
    
      {variants.length > 0 ? (
        <section
        
          aria-label="Descripción del producto"
          className="bg-floralwhite max-w-screen-xl grid grid-cols-12 m-auto p-5 z-0"
          target="_blank"
          rel="noopener noreferrer"
        >
    
          {/* Columna de imagenes */}
          
          <section aria-label="Imágenes del producto" className="mb-10 col-span-12 md:col-span-6 ">
            {/* Botón de regreso */}
            <div className="md:w-5/6 mx-auto mt-2">
              {variantId  || previousPage.includes("/filtersResults/?category") ? 
               (
               <a onClick={() => handleGoBack()} className="self-start mb-3">
               <button className="flex justify-start text-lightblue bg-blue-500 transition duration-200 opacity-60 hover:opacity-100">
                {variantId ? "Regresar al carrito" : isPrevCategoryExist ? `Regresar a ${prevCategory}` : `Regresar a ${category}` }
               </button>
             </a>)
               :
               (
                 <a onClick={() => handleGoToCategory(category)} className="self-start mb-3">
              <button className="flex justify-start text-lightblue bg-blue-500 transition duration-200 opacity-60 hover:opacity-100">
              {`Regresar a ${category}`}
              </button>
            </a> )
           
            }
            </div>
              {/* Imágenes debajo de la principal */}
              <div className="md:w-5/6 m-auto mt-2">
                {images && images.length > 0 ? (
                  <ImageGallery
                    showPlayButton={false}
                    originalHeight={"275px"}
                    disableThumbnailScroll={false}
                    disableKeyDown={false}
                    disableSwipe={false}
                    loading={"lazy"}
                    items={galleryImages}
                  />
                ) : null}
              </div>
          </section>


          {/* Sección con los detalles del producto*/}
          <section
            aria-label="Detalles del producto"
            className="mb-10 col-span-12 md:col-span-6 m-auto m-0"
          >
            <div className="grid grid-cols-12 md:col-span-12">
              <div className="col-span-12 md:col-span-6">
                <h2
                  aria-label={`Marca ${brand}`}
                  className="flex justify-start text-sm text-lightblue"
                >
                  {" "}
                  {brand}
                </h2>
              </div>

              <div className="col-span-12 md:col-span-6">
                {skuSelected ? (
                  <h2
                    aria-label={`Referencia del producto ${variantSelected?.variant?.data?.attributes?.sku}`}
                    className="flex justify-end text-sm"
                  >
                    Ref {skuSelected}
                  </h2>
                ) : (
                  <h2
                    aria-label={`Referencia del producto ${variantSelected?.variant?.data?.attributes?.sku}`}
                    className="flex justify-end text-sm"
                  >
                    Ref{" "}
                    {variantSelected
                      ? variantSelected?.variant?.data?.attributes?.sku
                      : variants[0]?.attributes?.sku}
                  </h2>
                )}
              </div>
            </div>

            <h1
              aria-label={`Nombre del producto ${name}`}
              className="mb-3 text-xl font-bold"
            >
              {name}
            </h1>
            <p>{shortDescrption}...</p>
            <a onClick={() => handleClick()}>
              <button className="flex justify-start text-lightblue mb-3 bg-blue-500 transition duration-200 opacity-60 hover:opacity-100">
                Leer más
              </button>
            </a>
            {/* Sección seleccion del producto*/}
            <section>
              <ProductFeatures
                variantData={data || null}
                variantsList={variants}
                setImages={setImages}
                setImage={setImage}
                setvariantSelected={setvariantSelected}
                setPrice={setPrice}
                setEnableButton={setEnableButton}
              />
            </section>

            {/* INFORMACION E ICONOS DEL PRODUCTO, ESTATICOS*/}
            <div className="flex grid grid-cols-12 gap-2 w-full justify-items-stretch ">
              <div className="col-span-6 flex mt-5 items-center">
                <Image
                  priority={true}
                  width="50"
                  height="50"
                  src={`${baseURL}thumbnail_Detinmarin_Sitio_Web_iconos_600px_01_63399d6115.webp`}
                  alt="tailwind logo"
                  className="rounded-full mr-3"
                />
                <p className="text-sm md:text-base">
                  Tipo de material: <br />
                  {materials.length > 0
                    ? materials.map((material, index) => {
                        return (
                          <span key={index}>{material.attributes.name}</span>
                        );
                      })
                    : null}
                </p>
              </div>
              {/* INFORMACION E ICONOS DE LA VARIANTE, DINAMICOS*/}
              {
                variantSelected ? (
                  <>
                    <div className="col-span-6 flex mt-5 items-center">
                      <Image
                        priority={true}
                        width="50"
                        height="50"
                        src={`${baseURL}Detinmarin_Sitio_Web_iconos_600px_05_53e3c402fc.webp`}
                        alt="tailwind logo"
                        className="rounded-full mr-3"
                      />
                      <p className="text-sm md:text-base">
                        Tamaño: <br />
                        {sizeVariantSelected != null
                          ? sizeVariantSelected
                          : variantSelected?.variant?.data?.attributes?.size}
                      </p>
                    </div>
                    <div className="col-span-6 flex mt-5 items-center">
                      <Image
                        priority={true}
                        width="50"
                        height="50"
                        src={`${baseURL}thumbnail_Detinmarin_Sitio_Web_iconos_600px_02_571dd7c62d.webp`}
                        alt="tailwind logo"
                        className="rounded-full mr-3"
                      />
                      <p className="text-sm md:text-base">
                        Rango de edad: <br />
                        {variantSelected?.variant?.data?.attributes?.ageRange}
                      </p>
                    </div>
                    <div className="col-span-6 flex mt-5 items-center">
                      <Image
                        priority={true}
                        width="50"
                        height="50"
                        src={`${baseURL}Detinmarin_Sitio_Web_iconos_600px_03_0ac6e0b69d.webp`}
                        alt="tailwind logo"
                        className="rounded-full mr-3"
                      />
                      {stockVariantSelected != null ? (
                        <p className="text-sm md:text-base">
                          Existencias: <br />
                          {stockVariantSelected === 0 ? (
                            <span className="text-red">Agotados</span>
                          ) : (
                            "Disponibles"
                          )}
                        </p>
                      ) : (
                        <p className="text-sm md:text-base">
                          Existencias: <br />
                          {variantSelected?.variant?.data?.attributes?.stock ===
                          0 ? (
                            <span className="text-red">Agotados</span>
                          ) : (
                            "Disponibles"
                          )}
                        </p>
                      )}
                    </div>
                    {Object.entries(variantSelected.features).map(
                      (feature, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-6 flex mt-5 items-center"
                          >
                            <Image
                              priority={true}
                              width="50"
                              height="50"
                              src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/Detinmarin_Sitio_Web_iconos_600px_04_97a571b092.webp`}
                              alt="tailwind logo"
                              className="rounded-full mr-3"
                            />
                            <p className="text-sm md:text-base">
                              {feature[0]}: <br />
                              {feature[1]}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    <div className="col-span-6 flex mt-5 items-center">
                      <Image
                        priority={true}
                        width="50"
                        height="50"
                        src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/Detinmarin_Sitio_Web_iconos_600px_03_0ac6e0b69d.webp`}
                        alt="tailwind logo"
                        className="rounded-full mr-3"
                      />
                      {stockVariantSelected != null ? (
                        <p className="text-sm md:text-base">
                          Existencias: <br />
                          {stockVariantSelected == 0 ? (
                            <span className="text-red">Agotados</span>
                          ) : (
                            "Disponibles"
                          )}
                        </p>
                      ) : (
                        <p className="text-sm md:text-base">
                          Existencias: <br />
                          {(variantSelected?.variant?.data?.attributes?.stock ||
                            variants[0].attributes.stock) <= 0 ? (
                            <span className="text-red">Agotados</span>
                          ) : (
                            "Disponibles"
                          )}
                        </p>
                      )}
                    </div>

                    {Object.entries(variantItem).map(([key, value]) => {
                      let iconeImage = null;
                      // Obtén la traducción de la clave en español
                      const translatedKey = keyTranslations[key] || key;
                      if (value != null) {
                        iconeImage =
                          key === "size"
                            ? "https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/Detinmarin_Sitio_Web_iconos_600px_05_53e3c402fc.webp"
                            : "https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/Detinmarin_Sitio_Web_iconos_600px_02_571dd7c62d.webp";
                        return (
                          <div
                            key={key}
                            className="col-span-6 flex mt-5 items-center"
                          >
                            <Image
                              priority={true}
                              width={50}
                              height={50}
                              src={iconeImage}
                              alt="tailwind logo"
                              className="rounded-full mr-3"
                            />
                            <p className="text-sm md:text-base">
                              {translatedKey}: <br />
                              {value}
                            </p>
                          </div>
                        );
                      }
                    })}
                    {JSON.stringify(featuresSelected) !==
                      JSON.stringify({ null: null }) &&
                      Object.entries(featuresSelected).map((feature, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-6 flex mt-5 items-center"
                          >
                            <Image
                              priority={true}
                              width="50"
                              height="50"
                              src={`https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/Detinmarin_Sitio_Web_iconos_600px_04_97a571b092.webp`}
                              alt="tailwind logo"
                              className="rounded-full mr-3"
                            />
                            <p className="text-sm md:text-base">
                              {feature[0]}: <br />
                              {feature[1]}
                            </p>
                          </div>
                        );
                      })}
                  </>
                )
                //cuando el producto solo tiene una capa de variante, obtengo el variants[0]
              }
            </div>

            {/* precio, cantidad de la variante */}
            <div className="col-span-12 grid grid-cols-12  md:flex items-center justify-between p-4">
              <span className="col-span-4 md:col-span-5 font-bold md:text-[30px]">
                {currency} {price}
              </span>
              <div className="col-span-8 mdd:col-span-7 md:flex md:flex-col items-end md:items-end p-3">
                <div className="grid md:flex items-center mb-2 ">
                  <span className="text-grey mx-3">Cantidad:</span>
                  <div className="bg-resene rounded-full md:m-3 w-[140px] flex items-center justify-center p-2 space-x-4">
                    <button
                      aria-label="Disminuir cantidad de produto"
                      className=" bg-grey-100 rounded-full text-white"
                    >
                      <BiMinus onClick={decreaseCounter} />
                    </button>
                    {/* <span>{quantity}</span> */}
                    <div className="group inline-block relative">
                      {stockVariantSelected ? (
                        <button
                          type="button"
                          className="bg-white rounded-full text-black px-4 py-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline min-w-[60px]"
                        >
                          {quantitySelected}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-white rounded-full text-black px-4 py-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline min-w-[60px]"
                        >
                          {quantity}
                        </button>
                      )}

                      <ul className="absolute hidden text-grey-800 group-hover:block border border-grey-200 bg-white max-h-40 overflow-y-auto">
                        {(stockVariantSelected
                          ? [...Array(stockVariantSelected).keys()]
                          : [...Array(variants[0].attributes.stock).keys()]
                        ).map((index) => (
                          <li
                            key={index + 1}
                            onClick={() => handleQuantityChange(index + 1)}
                            className="cursor-pointer py-2 px-4 hover:bg-grey-200"
                          >
                            {index + 1}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      aria-label="Aumentar cantidad de produto"
                      className=" bg-grey-100 rounded-full  text-white"
                    >
                      <BiPlus onClick={increaseCounter} />
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    enableButton ? "bg-aquamarine" : "bg-grey-200"
                  } rounded-sm p-2 md:p-3  md:mx-4"`}
                >
                  <AddItemBtn
                    variantData={data || null}
                    quantityItem={
                      quantitySelected !== null ? quantitySelected : quantity
                    }
                    variant={
                      lastVariantSelected !== null
                        ? lastVariantSelected
                        : variantSelected?.variant?.data
                        ? variantSelected.variant.data
                        : variants[0]
                    } //Se envía la ultima variante seleccionada
                    features={
                      featuresSelected !== null
                        ? featuresSelected
                        : variantSelected?.features
                        ? variantSelected.features
                        : {}
                    }
                    cartItems={cartSummary.items}
                    cartQuantity={cartSummary.quantity}
                    sessionId={cartSummary.sessionId}
                    user={user}
                    setEnableButton={setEnableButton}
                    enableButton={enableButton}
                    product={product}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      ) : (
        <div className="text-center grid content-center h-80 m-auto">
          {" "}
          <h1 className="font-bold">¡Lo sentimos!</h1>{" "}
          <h2>En este momento este producto no se encuentra disponible.</h2>{" "}
        </div>
      )}
    </>
  );
}
export default ProductDetail;
