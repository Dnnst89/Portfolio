import { gql } from "@apollo/client";

const GetCartItemsList = gql`
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
                    color,
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

export default GetCartItemsList