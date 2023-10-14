import { gql } from "@apollo/client";

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DeleteCartItem($id: ID!) {
    deleteCartItem(id: $id) {
      data {
        id
      }
    }
  }
`;

export default DELETE_CART_ITEM_MUTATION;
