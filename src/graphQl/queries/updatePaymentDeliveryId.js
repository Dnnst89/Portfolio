import { gql } from "@apollo/client";

export const UPDATE_PAYMENT_DELIVERY_ID = gql`
  mutation updatePaymentDelivery($id: ID!, $newDeliveryId: Int!) {
    updatePaymentDetail(id: $id, data: { deliveryId: $newDeliveryId }) {
      data {
        id
        attributes {
          deliveryId
        }
      }
    }
  }
`;
