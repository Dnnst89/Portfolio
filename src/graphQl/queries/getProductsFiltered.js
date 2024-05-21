import { gql } from "@apollo/client";

const getProductsFiltered = gql`
query GetProductsFiltered(
  $initialAge: Float
  $finalAge: Float
  $minPrice: Float
  $maxPrice: Float
  $category: String
  $page: Int!
  $pageSize: Int!
) {
  products(
    filters: {
      categories: { name: { containsi: $category } }
      and: {
        variants: {
          finalAge: { gte: $initialAge }
          initialAge: { lte: $finalAge }
          localCurrencyPrice: { gte: $minPrice, lte: $maxPrice }
        }
      }
    }
    pagination: { page: $page, pageSize: $pageSize }
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
              localCurrencyPrice
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

export default getProductsFiltered;
