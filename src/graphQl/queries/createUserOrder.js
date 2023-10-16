import { gql } from "@apollo/client";
export const CREATE_ORDER = gql`
  mutation CreateOrderDetail(
    $user_id: ID!
    $status: String!
    $subTotal: Float
    $taxes: Float
    $total: Float
    $publishedAt: DateTime!
  ) {
    createOrderDetail(
      data: {
        publishedAt: $publishedAt
        status: $status
        subTotal: $subTotal
        taxes: $taxes
        total: $total
        users_permissions_user: $user_id
      }
    ) {
      data {
        id
        attributes {
          status
          subTotal
          taxes
          total
          users_permissions_user {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
