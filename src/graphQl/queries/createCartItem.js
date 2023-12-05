import { gql } from "@apollo/client";

const CREATE_CART_ITEM_MUTATION = gql`
mutation CreateCartItem($quantity: Int!, $variantId: ID!, $shoppingSessionId: ID!,$publishedAt: DateTime!, $features: JSON) {
  createCartItem(
    data: {
      features: $features
      quantity: $quantity
      variant: $variantId
      publishedAt: $publishedAt
      shopping_sessions: [$shoppingSessionId]
    }
  ) {
      data{
        id,
        attributes{
          quantity,
          features,
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