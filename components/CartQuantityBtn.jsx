import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  addQtyItems,
  isTaxesLoading,
  reduceQtyItems,
  updateQtyItems,
} from "@/redux/features/cart-slice";
import { useMutation } from "@apollo/client";
import UPDATE_CART_ITEM_QUANTITY_MUTATION from "@/src/graphQl/queries/updateCartItemQuantity";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const CartQuantityBtn = ({ quantityCartItem, stock, idCartItem }) => {
  const [quantity, setQuantity] = useState(quantityCartItem);
  const [blockIncrementBtn, setBlockIncrementBtn] = useState(false);
  const [blockDecrementBtn, setBlockDecrementBtn] = useState(false);
  const [blockOnchangeBtn, setBlockOnchangeBtn] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [updateCartItemQuantity] = useMutation(
    UPDATE_CART_ITEM_QUANTITY_MUTATION
  );

  const handleQuantityChange = (newQuantity) => {
    //verificamos que la cantidad sea menor o igual a 1
    // para evitar request inecesario
    if (newQuantity === quantityCartItem) {
      setBlockOnchangeBtn(true);
    }
    //no es posible seleccionar cantidades negativas
    if (newQuantity < 1) {
      setBlockOnchangeBtn(true);
    }

    try {
      if (newQuantity <= stock) {
        dispatch(isTaxesLoading(true));
        setQuantity(newQuantity);
        console.log("newquantity", newQuantity);
        console.log("idCartItem", idCartItem);
        updateCartItemQuantity({
          variables: { newQuantity, cartItemId: idCartItem },
        })
          .then((response) => {
            // Manejar la respuesta de la mutación aquí, si es necesario

            dispatch(addQtyItems(newQuantity)); //actualizo la store
          })
          .catch((error) => {
            // Manejar errores de la mutación aquí
            toast.error("Ha sucedido un error", error);
          });
      }
    } catch (error) {
      console.error("Error al agregar la cantidad.", error);
    }
  };

  const handleIncrement = () => {
    /*
     Bloqueamos el boton de disminuir cuando quantity es menor
     a lo que tenemos en stock.
     */
    if (quantity > stock) {
      setBlockIncrementBtn(true);
    }
    if (quantity < stock) {
      dispatch(isTaxesLoading(true));
      const newQuantity = quantity + 1; //guardo en una nueva cosntante
      setQuantity(newQuantity); //actualizo el state
      updateCartItemQuantity({
        variables: { newQuantity: newQuantity, cartItemId: idCartItem },
      })
        .then((response) => {
          dispatch(addQtyItems()); //actualizo la store
          // Manejar la respuesta de la mutación aquí, si es necesario
        })
        .catch((error) => {
          // Manejar errores de la mutación aquí
          toast.error("Ha sucedido un error");
        });
    }
  };

  const handleDecrement = () => {
    /*
     Bloqueamos el boton de aumentar cuando quantity es mayor
     a lo que tenemos en stock.
     */
    if (quantity < 1) {
      setBlockDecrementBtn(true);
    }
    if (quantity > 1) {
      dispatch(isTaxesLoading(true)); //
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItemQuantity({
        variables: { newQuantity, cartItemId: idCartItem },
      })
        .then((response) => {
          dispatch(reduceQtyItems());
          // Manejar la respuesta de la mutación aquí, si es necesario
        })
        .catch((error) => {
          // Manejar errores de la mutación aquí
          toast.error("Ha sucedido un error");
        });
    }
  };

  return (
    <section className="w-1/4 mx-2">
      <Toaster
        containerStyle={{
          top: 150,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          success: {
            style: {
              background: "#67C3AD",
            },
          },
          error: {
            style: {
              background: "#f87171",
            },
          },
        }}
      />
      <div className="grid items-center mb-2 relative ">
        <span className="text-grey m-auto">Cantidad:</span>
        <div
          className="bg-resene rounded-full m-3 w-[120px]
         flex items-center justify-center p-2 space-x-4"
        >
          <button
            aria-label="Disminuir cantidad producto"
            className={` ${
              quantity === 1
                ? "hidden"
                : "bg-grey-200 rounded-full text-white relative z-10"
            } `}
            disabled={cart.loadingTaxes || blockDecrementBtn}
            onClick={handleDecrement}
          >
            {}
            <BiMinus />
          </button>
          <div className="group inline-block relative ">
            <button
              type="button"
              className="bg-white rounded-full text-black px-4 py-2 
              transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
            >
              {quantity}
            </button>
            <ul
              className={` ${
                cart.loadingTaxes
                  ? "hidden"
                  : `absolute z-20 hidden text-grey-800 group-hover:block
              border border-grey-200 bg-white max-h-40 overflow-y-auto`
              }`}
            >
              {[...Array(stock).keys()].map((index) => (
                <li
                  key={index}
                  onClick={
                    !cart.loadingTaxes
                      ? () => handleQuantityChange(index + 1)
                      : undefined
                  }
                  className="cursor-pointer py-2 px-4 hover:bg-grey-200"
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
          <span>/{stock}</span>
          <button
            aria-label="Aumentar cantidad producto"
            className={` ${
              stock === quantity
                ? "hidden"
                : "bg-grey-200 rounded-full text-white relative z-10"
            } `}
            disabled={cart.loadingTaxes || blockIncrementBtn}
            onClick={handleIncrement}
          >
            <BiPlus />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartQuantityBtn;
