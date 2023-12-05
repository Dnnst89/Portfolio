import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import DELETE_CART_ITEM_MUTATION from '../src/graphQl/queries/deleteCartItem';
import GET_CART_ITEMS_LIST from '@/src/graphQl/queries/getCartItems';
import { updateQtyItems } from '@/redux/features/cart-slice';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import useStorage from '@/hooks/useStorage';
import useCartSummary from '@/hooks/useCartSummary';
import { MdOutlineDeleteForever } from "react-icons/md";

const DeleteCartItemBtn = ({ idItem, qtyItem }) => {
  const dispatch = useDispatch()
  const { user } = useStorage();
  const {
    items,
    quantity,
    errors,
    sessionId } = useCartSummary({ userId: user?.id });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION, {
  });

  useEffect(() => {
    dispatch(updateQtyItems(quantity - qtyItem))// se hace este dispatch para que el useCartSummary sepa cuanta cantidad hay, y si cambia vuelva a renderizar
  }, [])



  const handleDelete = () => {
    deleteCartItem({ variables: { id: idItem } })
      .then((response) => {
        // Manejar la respuesta de la mutación aquí, si es necesario
        dispatch(updateQtyItems(quantity - qtyItem))//actualiza la cantidad de items en el state para que useCartSummary vuelva arenderizar

        toast.success('Se ha eliminado un producto');
        console.log(qtyItem)
      })
      .catch((error) => {
        // Manejar errores de la mutación aquí
        toast.error('Ha sucedido un error');
      });



  };
  return (
    <>
      <button aria-label='Eliminar producto' className="ml-3 text-3xl md:col-span-6 grid content-center justify-center" onClick={handleDelete}>
        {/* <BiX /> */}
        <MdOutlineDeleteForever color="#FB82AF" size={40}></MdOutlineDeleteForever>
      </button> </>


  )
}

export default DeleteCartItemBtn