
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import CREATE_CART_ITEM_MUTATION from '../src/graphQl/queries/createCartItem';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQtyItems } from '@/redux/features/cart-slice';
import { addItemToCart } from '@/redux/features/cart-slice';

const AddCartItemBtn = ({quantity, idVariant}) => {
    const dispatch = useDispatch()
    const { shoppingSession } = useSelector(state => state.cart) 
    const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION,{    
      });


      const handleAdd = () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString();
        createCartItem({ variables: {quantity:quantity, variantId:idVariant,shoppingSessionId: shoppingSession.id, publishedAt: fechaFormateada} })
          .then((response) => {
            toast.success('Se ha agregado un producto');
            // Manejar la respuesta de la mutación aquí, si es necesario

            dispatch(addItemToCart(response.data));
            
          })
          .catch((error) => {
            // Manejar errores de la mutación aquí
            toast.error('Ha sucedido un error');
          });
      }; 
    return (
        <div> <Toaster/> 
          <button className="text-white text-sm"
        onClick={handleAdd}
        >
            Agregar al carrito
        </button></div>
    )
}

export default AddCartItemBtn