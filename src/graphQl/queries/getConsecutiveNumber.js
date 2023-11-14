import { gql } from "@apollo/client";

export const GET_CONSECUTIVE_NUMBER = gql`
  query getConsecutiveNumber($page: Int!, $pageSize: Int!) {
    electronicInvoices(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "id:desc"
    ) {
      data {
        id
        attributes {
          consecutive
        }
      }
    }
  }
`;
