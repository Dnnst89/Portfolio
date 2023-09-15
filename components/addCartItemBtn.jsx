

import { useMutation } from '@apollo/client';
import CREATE_CART_ITEM_MUTATION from '../src/graphQl/queries/createCartItem';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQtyItems } from '@/redux/features/cart-slice';

const AddCartItemBtn = ({quantity, idVariant}) => {

    const dispatch = useDispatch()
    const {cartQtyItems} = useSelector(state => state.cart ) //obtengo la cantidad de items que tengo en carrito
    
    const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION,{
        
      });

      const handleAdd = () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString();
        console.log(quantity+" "+idVariant+" "+fechaFormateada)
        createCartItem({ variables: {quantity:quantity, variantId:idVariant, publishedAt: fechaFormateada} })
          .then((response) => {
            // Manejar la respuesta de la mutación aquí, si es necesario
            dispatch(updateQtyItems(cartQtyItems+quantity))//actualiza la cantidad de items en el state
            alert("Se ha agregado un producto al carrito");
          })
          .catch((error) => {
            // Manejar errores de la mutación aquí
            console.log(error)
          });
      }; 
    return (
        <div><button className="text-white text-sm"
        onClick={handleAdd}
        >
            Agregar al carrito
        </button></div>
    )
}

export default AddCartItemBtn