import { gql } from "@apollo/client";
export const CREATE_ORDER = gql`
  mutation CreateOrderDetail(
    $user_id: ID!
    $status: String!
    $total: Float
    $publishedAt: DateTime!
  ) {
    createOrderDetail(
      data: {
        publishedAt: $publishedAt
        status: $status
        total: $total
        users_permissions_user: $user_id
      }
    ) {
      data {
        id
        attributes {
          total
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
