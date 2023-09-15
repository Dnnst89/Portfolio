import { gql } from "@apollo/client";

const CREATE_CART_ITEM_MUTATION = gql`
mutation CreateCartItem($quantity: Int!, $variantId: ID!, $publishedAt: DateTime!) {
    createCartItem(
      data: {
        quantity: $quantity
        variant: $variantId
        publishedAt: $publishedAt
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

export default CREATE_CART_ITEM_MUTATION