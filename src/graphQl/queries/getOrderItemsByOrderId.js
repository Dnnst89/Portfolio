
import { gql } from '@apollo/client';

const GET_ORDER_ITEMS_BY_ORDER_ID = gql`
query GetOrderItemsByOrderId($orderId: ID!) {
  orderDetail(id: $orderId) {
    data {
      id
      attributes {
        subTotal
        taxes
        total
        status
      }
      attributes {
        order_items {
          data {
            id
            attributes {
              quantity
              variant {
                data {
                  id
                  attributes {
                    price
                    product{
                      data{
                        id
                        attributes{
                          name
                          brand
                          
                        }
                      }
                    }
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
    }
  }
}


`;

export default GET_ORDER_ITEMS_BY_ORDER_ID;
