import { gql } from "@apollo/client";

export const UPDATE_ORDER_DETAILS_STATUS = gql`
  mutation UpdateOrderDetail($id: ID!, $newStatus: String!) {
    updateOrderDetail(id: $id, data: { status: $newStatus }) {
      data {
        id
        attributes {
          status
        }
      }
    }
  }
`;
