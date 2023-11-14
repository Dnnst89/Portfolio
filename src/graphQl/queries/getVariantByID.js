import { gql } from '@apollo/client';

const GET_VARIANT_BY_ID = gql`
query GetVariantById($id: ID) {
  variant(id: $id) {
    data {
      id
      attributes {
        type
        typeValue
        size
        sku
        color
        price
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
        parentVariant{
          data{
            id
            attributes{
              type
              typeValue
            }
          }
        }
        childVariants{
          data{
            id
            attributes{
              type
              typeValue
              price
              stock
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

export default GET_VARIANT_BY_ID;