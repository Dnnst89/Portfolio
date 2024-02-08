"use client";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGifts } from "@/redux/features/selectedGiftsSlice";
const animatedComponent = makeAnimated();

const WrappedGiftCheckbox = () => {
  const dispatch = useDispatch();
  //Se obtienen los datos del usuario en sesion
  const { user } = useStorage();
  const userId = user?.id;
  //Se obtienen los productos agregados al carrito
  const { items } = useCartSummary({
    userId: userId,
  });

  //Se obtienen los productos desde el carrito
  const itemsOnCart = items.map(
    (gift) =>
      gift?.attributes?.variant?.data?.attributes?.product?.data.attributes
  );
  // Se controla el formato en quese mostraran los regalos seleccionados
  const listedGifts = itemsOnCart.map((gift) => ({
    value: gift.name,
    label: gift.name,
  }));

  // Agregamos los articulos seleccionados al store
  const handleSelectChange = (value) => {
    dispatch(setSelectedGifts(value));
  };

  return (
    <div className="w-3/4 m-auto mt-5 mb-2 pb-2 ">
      <Select
        closeMenuOnScroll={false}
        components={animatedComponent}
        isMulti
        options={listedGifts}
        onChange={handleSelectChange}
      />
    </div>
  );
};
export default WrappedGiftCheckbox;
