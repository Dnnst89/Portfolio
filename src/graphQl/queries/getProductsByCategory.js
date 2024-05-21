import { gql } from "@apollo/client";

const ProductsByCategory = gql`
  query GetByCategory($category: String) {
    products(
      filters: { categories: { name: { eq: $category } } }
      pagination: { pageSize: 500 }
    ) {
      data {
        id
        attributes {
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
          variants {
            data {
              id
              attributes {
                sku
                size
                price
                localCurrencyPrice
                ageRange
                stock
                initialAge
                finalAge
                typeValue
                type
                createdAt
                updatedAt
                publishedAt
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

export default ProductsByCategory;
