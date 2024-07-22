import { gql } from "@apollo/client";

export const UPDATE_PAYMENT_DETAIL_ORDER = gql`
  mutation UpdatePaymentDetail($id: ID!, $newOrderNumber: Long!) {
    updatePaymentDetail(id: $id, data: { orderNumber: $newOrderNumber }) {
      data {
        id
        attributes {
          orderNumber
        }
      }
    }
  }
`;
