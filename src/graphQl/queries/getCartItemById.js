import { gql } from "@apollo/client";

const GET_CART_ITEM_BY_ID = gql`
  query CartItem($id: ID) {
    cartItem(id: 2182) {
      data {
        id
        attributes {
          quantity
          features
          price
          name
          brand
          variantId
          cabys
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

export default GET_CART_ITEM_BY_ID;
