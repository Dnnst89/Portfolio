
import { gql } from '@apollo/client';

const GET_FEATURED_PRODUCTS = gql`
query GetFeaturedProducts {
  products(filters: {
    featured: { eq: true }
  }, pagination: { pageSize: 500 }) {
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

export default GET_FEATURED_PRODUCTS;
