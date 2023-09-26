import { gql } from "@apollo/client";

const GET_CART_ITEMS_LIST_SHOPPING_SESSION = gql`
query GetCartItemsBySession($shoppingSessionId: ID!) {
  cartItems(filters: { shopping_sessions:{id:{eq: $shoppingSessionId}}} ) {
    data {
      id
      attributes {
        quantity
        variant {
          data {
            id
            attributes {
              stock
              product {
                data {
                  id
                  attributes {
                    name
                    brand
                    description
                    cabys
                  }
                }
              }
              color
              price
              ageRange
              size
              weight {
                weight
                unitWeight
              }
              images {
                data {
                  id
                  attributes {
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default GET_CART_ITEMS_LIST_SHOPPING_SESSION