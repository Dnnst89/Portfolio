import { gql } from "@apollo/client";

export const GET_PENDING_ORDER = gql`
  query GetUserOrders($userId: ID!) {
    usersPermissionsUser(id: $userId) {
      data {
        attributes {
          order_details {
            data {
              attributes {
                status
              }
            }
          }
        }
      }
    }
  }
`;
