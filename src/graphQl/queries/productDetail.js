import { gql } from '@apollo/client';

const ProductDetailQuery = gql`
query GetProducts($id: ID){
    product(id:$id) {
      data{
        id,
        attributes{
          name,
          description,
          sku,
          materials{
            data{
              id,
              attributes{
                name
              }
            }
          }
          variants{
            data{
              id
              attributes{
                size,
                color,
                price,
                weight{
                  id,
                  unitWeight,
                  weight
                },
                stock,
                ageRange,
                images{
                  data{
                    id,
                    attributes{
                      url,
                    }
                  }
                }
              }
            }
          },
          reviews{
              data{
              id,
              attributes{
                users_permissions_user{
                  data{
                    id,
                    attributes{
                      username
                    }
                  }
                },
                score,
                comment
              }
            }
          }
        }
      }
    }
  }  
`;

export default ProductDetailQuery;