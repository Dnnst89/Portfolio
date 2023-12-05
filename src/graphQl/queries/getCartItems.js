import { gql } from "@apollo/client";

const GET_CART_ITEMS_LIST = gql`
    query GetCartItems {
        cartItems {
          data{
            id,
            attributes{
              quantity,
              variant{
                data{
                  id,
                  attributes{
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
                    stock,
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
`

export default GET_CART_ITEMS_LIST