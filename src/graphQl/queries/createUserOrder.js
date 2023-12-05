import { gql } from "@apollo/client";
export const CREATE_ORDER = gql`
mutation CreateOrderDetail(
  $user_id: ID!
  $status: String!
  $paymentId: ID!
  $publishedAt: DateTime!
) {
  createOrderDetail(
    data: {
      publishedAt: $publishedAt
      status: $status
      payment_detail: $paymentId
      users_permissions_user: $user_id
    }
  ) {
    data {
      id
      attributes {
        status
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
