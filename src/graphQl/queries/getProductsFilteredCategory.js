import { gql } from "@apollo/client";

const getProductsFilteredCategory = gql`
query GetProductsByCategory($category: String!, $page: Int!, $pageSize: Int!){
    products(filters:{ categories: {name: {containsi:$category}} } pagination: { page: $page, pageSize: $pageSize }) {
     data{
      id
      attributes{
        name
        brand
        defaultPrice
        coverImage{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
    meta{
      pagination {
        total
        pageCount
      }
     }
    }
   }
`;

export default getProductsFilteredCategory;
