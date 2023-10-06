import { gql } from '@apollo/client';

const getProductByAgeRange = gql`
query getProductsByAgeRange($ageRange: String!, $page: Int!, $pageSize: Int!) {
  products(
    filters: { variants: { ageRange: { contains: $ageRange } } }
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    meta {
      pagination {
        total
        pageCount
      }
    }
    data {
      id
      attributes {
        variants {
          data {
            id
            attributes {
              ageRange
            }
          }
        }
        name
        brand
        defaultPrice
        coverImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;

export default getProductByAgeRange