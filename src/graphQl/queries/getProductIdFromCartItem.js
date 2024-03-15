import { gql } from "@apollo/client";


const PRODUCT_ID_CARTITEM_QUERY = gql`
query CartItem($cartItemId: ID!) {
    cartItem(id: $cartItemId) {
    		data{
          attributes{
            variant{
              data{
                id
                attributes{
                  product{
                    data{
                      id
                    }
                  }
                }
              }
            }
          }
        }
    }
}
`;

export default PRODUCT_ID_CARTITEM_QUERY;