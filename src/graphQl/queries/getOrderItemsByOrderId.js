import { gql } from "@apollo/client";

const GET_ORDER_ITEMS_BY_ORDER_ID = gql`
query GetOrderItemsByOrderId($orderId: ID!) {
  orderDetail(id: $orderId) {
    data {
      id
      attributes {
        payment_detail {
          data {
            attributes {
              subtotal
              taxes
              total
              deliveryPayment
            }
          }
        }
        status
      }
      attributes {
        order_items {
          data {
            id
            attributes {
              variantId
              quantity
              price
              name
              brand
              cabys
              images {
                data {
                  id
                  attributes {
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

`;

export default GET_ORDER_ITEMS_BY_ORDER_ID;
