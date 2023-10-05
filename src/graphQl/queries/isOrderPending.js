import { gql } from "@apollo/client";

export const GET_PENDING_ORDER = gql`
  query GetUserOrderStatus($userId: ID!, $status: String) {
    orderDetails(
      filters: {
        status: { eq: $status }
        and: { users_permissions_user: { id: { eq: $userId } } }
      }
    ) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
            }
          }
          status
        }
      }
    }
  }
`;
