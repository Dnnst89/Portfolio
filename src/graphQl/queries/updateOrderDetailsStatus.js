import { gql } from "@apollo/client";

export const UPDATE_ORDER_DETAILS_STATUS = gql`
  mutation UpdateOrderDetail($id: ID!, $data: OrderDetailInput!) {
    updateOrderDetail(id: $id, data: $data) {
      id
      attributes {
        status
      }
    }
  }
`;
