import { gql } from "@apollo/client";

const ProductDetailQuery = gql`
  query GetProducts($id: ID) {
    product(id: $id) {
      data {
        id
        attributes {
          name
          brand
          description
          cabys
          materials {
            data {
              id
              attributes {
                name
              }
            }
          }
          categories {
            data {
              attributes {
                name
              }
            }
          }
          variants(filters:{parentVariant:{id:{eq:null}}}) {
            data {
              id
              attributes {
                type
                typeValue
                size
                sku
                price
                localCurrencyPrice
                weight {
                  id
                  unitWeight
                  weight
                }
                stock
                ageRange
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
          reviews {
            data {
              id
              attributes {
                users_permissions_user {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
                score
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
