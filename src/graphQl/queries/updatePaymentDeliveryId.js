import { gql } from "@apollo/client";

export const UPDATE_PAYMENT_DELIVERY_ID = gql`
  mutation UpdatePaymentDetail($id: ID!, $newId: Int!) {
    updatePaymentDetail(id: $id, data: { deliveryId: $newId }) {
      data {
        id
        attributes {
          deliveryId
        }
      }
    }
  }
`;
