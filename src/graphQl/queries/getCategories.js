import { gql } from '@apollo/client';

const GetCategories = gql`
query GetCategories($page: Int!, $pageSize: Int!) {
  categories( pagination: { page: $page, pageSize: $pageSize }) {
    data {
      id
      attributes {
        name
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

export default GetCategories;
