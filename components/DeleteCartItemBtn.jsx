import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import DELETE_CART_ITEM_MUTATION from '../src/graphQl/queries/deleteCartItem';
import GET_CART_ITEMS_LIST from '@/src/graphQl/queries/getCartItems';
import { updateQtyItems } from '@/redux/features/cart-slice';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import useStorage from '@/hooks/useStorage';
import useCartSummary from '@/hooks/useCartSummary';

const DeleteCartItemBtn = ({ idItem, qtyItem }) => {
  const [deletedItem, setDeletedItem] = useState(null)
  const dispatch = useDispatch()
  const { user } = useStorage();
  useEffect(() => {
    console.log("producto eliminado")
  }, [deletedItem])

  const {
    items,
    quantity,
    error,
    sessionId } = useCartSummary({ userId: user?.id });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION, {
  });
  useEffect(() => {
    if (deletedItem) {
      // Si deletedItem no es null, significa que se eliminó un producto
      console.log("producto eliminado");
    }
  }, [deletedItem]);
  const handleDelete = () => {
    deleteCartItem({ variables: { id: idItem } })
      .then((response) => {
        console.log("quantity " + quantity)
        console.log("qtyItem " + qtyItem)
        // Manejar la respuesta de la mutación aquí, si es necesario
        dispatch(updateQtyItems(quantity - qtyItem))//actualiza la cantidad de items en el state
        setDeletedItem(response)
        toast.success('Se ha eliminado un producto');
      })
      .catch((error) => {
        // Manejar errores de la mutación aquí
        toast.error('Ha sucedido un error');
      });
  };
  return (
    <><Toaster />
      <button className="ml-3 text-3xl" onClick={handleDelete}>
        {/* <BiX /> */}
        🗑
      </button> </>


  )
}

export default DeleteCartItemBtn