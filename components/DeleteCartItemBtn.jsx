import React from 'react'
import { useMutation } from '@apollo/client';
import DELETE_CART_ITEM_MUTATION from '../src/graphQl/queries/deleteCartItem';
import GET_CART_ITEMS_LIST from '@/src/graphQl/queries/getCartItems';
import { updateQtyItems } from '@/redux/features/cart-slice';
import { useSelector,useDispatch } from 'react-redux';

const DeleteCartItemBtn = ({idItem, qtyItem}) => {

  const dispatch = useDispatch()
  const {cartQtyItems} = useSelector(state => state.cart ) //obtengo la cantidad de items que tengo en carrito

    const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION,{
      refetchQueries: [{query: GET_CART_ITEMS_LIST}]
    });

   
    
    const handleDelete = () => {
      deleteCartItem({ variables: { id:idItem } })
        .then((response) => {
          // Manejar la respuesta de la mutación aquí, si es necesario
          dispatch(updateQtyItems(cartQtyItems-qtyItem))//actualiza la cantidad de items en el state
        })
        .catch((error) => {
          // Manejar errores de la mutación aquí
          console.log(error)
        });
    };
  return (
    <div><button className="bg-orange hover:bg-yellow text-black py-2 px-4 m-4 rounded"
    onClick={handleDelete}
    >
    Remove
</button></div>
  )
}

export default DeleteCartItemBtn