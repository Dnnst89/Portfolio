import { gql } from "@apollo/client";

const UPDATE_CART_ITEM_QUANTITY_MUTATION = gql`
mutation UpdateCartItemQuantity($cartItemId: ID!, $newQuantity: Int!) {
    updateCartItem(id: $cartItemId, data: { quantity: $newQuantity }) {
      data {
        id
        attributes {
          quantity
        }
      }
    }
  }
`;

export default UPDATE_CART_ITEM_QUANTITY_MUTATION