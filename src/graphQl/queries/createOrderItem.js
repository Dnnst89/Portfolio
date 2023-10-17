import { gql } from "@apollo/client";

const CREATE_ORDER_ITEM_MUTATION = gql`
mutation CreateOrderItem($quantity: Int!, $variantId: ID!, $orderDetailId: ID!,$publishedAt: DateTime!) {
    createOrderItem(
      data: {
        quantity: $quantity
        variant: $variantId
        publishedAt: $publishedAt
        order_details: [$orderDetailId]
      }
    ) {
        data{
          id,
          attributes{
            quantity,
            variant{
              data{
                id,
                attributes{
                  stock,
                  product{
                    data{
                      id,
                      attributes{
                        name,
                        brand,
                        description
                      }
                    }
                  },
                  color,
                  price,
                  ageRange,
                  size,
                  weight{
                  weight,
                  unitWeight
                  }
                  images{
                    data{
                      id,
                      attributes{
                        width,
                        height,
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

export default CREATE_ORDER_ITEM_MUTATION