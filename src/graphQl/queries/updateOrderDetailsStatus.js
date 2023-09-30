import { gql } from "@apollo/client";

export const UPDATE_ORDER_DETAILS_STATUS = gql`
  mutation UpdateOrderDetailsStatus(
    $userId: ID!
    $orderDetailsId: ID!
    $newStatus: String!
  ) {
    updateUserOrderDetails(
      id: $userId
      orderDetailsId: $orderDetailsId
      input: { attributes: { status: $newStatus } }
    ) {
      user {
        id
      }
    }
  }
`;
