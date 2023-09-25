import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import CREATE_CART_ITEM_MUTATION from "../src/graphQl/queries/createCartItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQtyItems } from "@/redux/features/cart-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

const AddCartItemBtn = ({ quantity, idVariant }) => {
  const dispatch = useDispatch();
  //const { shoppingSession } = useSelector(state => state.cart) de momento no lo vamos a obtener de redux
  const { shoppingSession } = JSON.parse(localStorage.getItem("cartSession")); //lo obtenemos de local storage
  const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION, {});

  // Obtengo el objeto cartSession del localStorage (si existe)
  const existingCartSession = localStorage.getItem("cartSession");
  const parsedCartSession = existingCartSession
    ? JSON.parse(existingCartSession)
    : {};

  const handleAdd = () => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    createCartItem({
      variables: {
        quantity: quantity,
        variantId: idVariant,
        shoppingSessionId: shoppingSession.id,
        publishedAt: fechaFormateada,
      },
    })
      .then((response) => {
        // Manejar la respuesta de la mutación aquí, si es necesario
        const newCartItem = response.data.createCartItem.data;
        parsedCartSession.cartItems.data.push(newCartItem); //ingreso el nuevo cartitem al array
        localStorage.setItem("cartSession", JSON.stringify(parsedCartSession)); //lo ingreso al localstorage
        dispatch(addItemToCart(newCartItem));
        toast.success("Se ha agregado un producto");
      })
      .catch((error) => {
        // Manejar errores de la mutación aquí
        toast.error("Ha sucedido un error: " + error);
      });
  };
  return (
    <div>
      {" "}
      <Toaster />
      <button className="text-white text-sm" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddCartItemBtn;
