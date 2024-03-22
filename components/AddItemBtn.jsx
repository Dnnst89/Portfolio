"use client";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import CREATE_CART_ITEM_MUTATION from "../src/graphQl/queries/createCartItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems, updateQtyItems } from "@/redux/features/cart-slice";
import UPDATE_CART_ITEM_QUANTITY_MUTATION from "@/src/graphQl/queries/updateCartItemQuantity";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
import { useQuery } from "@apollo/client";
const AddItemBtn = ({
  variantData,
  product,
  quantityItem,
  variant,
  cartItems,
  cartQuantity,
  sessionId,
  user,
  features,
  enableButton,
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((x) => x.auth);
  const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION, {});
  let newQuantity = 0;

  const [updateCartItemQuantity] = useMutation(
    UPDATE_CART_ITEM_QUANTITY_MUTATION
  );
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 6 },
  });
  const { data: errorMessageGeneral } = useQuery(GET_ERROR_INFO, {
    variables: { id: 7 },
  });
  const { data: errorMessageStock } = useQuery(GET_ERROR_INFO, {
    variables: { id: 8 },
  });
  const { data: errorMessageAddProduct } = useQuery(GET_ERROR_INFO, {
    variables: { id: 9 },
  });

  const handleAdd = () => {
    //filtro los items para verificar si ya ese producto fue agregado, si fue agregado, se actualiza los  item en el carrito
    //si no esta en los items del carrito se crea o agrega como uno nuevo
    if (!user?.id && !isAuthenticated) {
      toast.error(errorMessage.errorInformation.data.attributes.error_message);
    } else {
      const itemFiltrado = cartItems.find(
        (item) => item.attributes.variant.data.id === variant?.id
      );
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      if (itemFiltrado) {
        //si el item esta en carrito
        if (variantData && variantData.variant && variantData.variant.data) {
          if (quantityItem < itemFiltrado.quantity) {
            newQuantity = quantityItem;
          } else {
            const quantityDetail = quantityItem - itemFiltrado.quantity;
            newQuantity = quantityDetail + itemFiltrado.quantity;
          }
        } else {
          newQuantity = quantityItem + itemFiltrado.quantity;
        }
        if (
          newQuantity > itemFiltrado.attributes.variant.data.attributes.stock
        ) {
          toast.error(
            errorMessageAddProduct.errorInformation.data.attributes
              .error_message
          );
        } else {
          updateCartItemQuantity({
            variables: {
              newQuantity: newQuantity,
              cartItemId: itemFiltrado.id,
            },
          })
            .then((response) => {
              dispatch(updateQtyItems(cartQuantity + quantityItem));
              toast.success("Se ha actualizado un producto");
              // Manejar la respuesta de la mutación aquí, si es necesario
            })
            .catch((error) => {
              // Manejar errores de la mutación aquí
              toast.error(
                errorMessageGeneral.errorInformation.data.attributes
                  .error_message
              );
            });
        }
      } else {
        //si el item nunca se ha agregado al carrito
        if (variant?.attributes?.stock > 0) {
          //si el stock del item es 0
          const variantAtt = variant?.attributes;
          createCartItem({
            //se crea un nuevo item en el carrito
            variables: {
              quantity: quantityItem,
              ...(Object.keys(features).length > 0 && { features }),
              variantId: variant.id,
              shoppingSessionId: sessionId,
              publishedAt: fechaFormateada,
              variantNumber: parseInt(variant?.id),
              price: variantAtt.price,
              name: product?.attributes?.name,
              brand: product?.attributes?.brand,
              cabys: product?.attributes?.cabys,
              imagesIds: variantAtt?.images?.data?.map((img) => img?.id),
            },
          })
            .then((response) => {
              // Manejar la respuesta de la mutación aquí, si es necesario
              const newCartItem = response.data.createCartItem.data;
              dispatch(updateQtyItems(cartQuantity + quantityItem)); //actualiza la cantidad de items en el state
              dispatch(updateCartItems([...cartItems, newCartItem]));
              toast.success("Se ha agregado un producto");
            })
            .catch((error) => {
              // Manejar errores de la mutación aquí
              toast.error(
                errorMessageGeneral.errorInformation.data.attributes
                  .error_message,
                error
              );
            });
        } else {
          toast.error(
            errorMessageStock.errorInformation.data.attributes.error_message
          );
        }
      }
    }
  };
  return (
    <div>
      {" "}
      <button
        disabled={!enableButton}
        className="text-white text-sm"
        onClick={handleAdd}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddItemBtn;
