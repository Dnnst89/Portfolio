import { gql } from "@apollo/client";

const CREATE_CART_ITEM_MUTATION = gql`
mutation CreateCartItem($quantity: Int!, $variantId: ID!,$variantNumber: Int, $shoppingSessionId: ID!,$publishedAt: DateTime!, $features: JSON, $name: String, $brand: String, $price:Float,  $imagesIds: [ID],$cabys: Long!,) {
  createCartItem(
    data: {
      features: $features
      quantity: $quantity
      variant: $variantId
      publishedAt: $publishedAt
      shopping_sessions: [$shoppingSessionId]
      variantId: $variantNumber,
      price: $price,
      name: $name,
      brand: $brand,
      cabys: $cabys,
      images: $imagesIds,
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