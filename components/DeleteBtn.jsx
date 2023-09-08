import React from 'react'
import { useMutation } from '@apollo/client';
import DELETE_CART_ITEM_MUTATION from '../src/graphQl/queries/deleteCartItem';
import GetCartItemsList from '@/src/graphQl/queries/getCartItems';

const DeleteBtn = ({idItem}) => {
    const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION,{
      refetchQueries: [{query: GetCartItemsList}]
    });
    
    const handleDelete = () => {
      deleteCartItem({ variables: { id:idItem } })
        .then((response) => {
          // Manejar la respuesta de la mutación aquí, si es necesario
          console.log(response)
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

export default DeleteBtn