import { gql } from "@apollo/client";

export const GET_BRANDS_BY_AGE_RANGE = gql`
  query GetProductsFilteredByAge($initialAge: Float, $finalAge: Float) {
    products(
      filters: {
        and: {
          variants: {
            finalAge: { gte: $initialAge }
            initialAge: { lte: $finalAge }
          }
        }
      }
    ) {
      data {
        id
        attributes {
          name
          brand
          defaultPrice
          variants {
            data {
              attributes {
                initialAge
                finalAge
                price
              }
            }
          }
          coverImage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;
