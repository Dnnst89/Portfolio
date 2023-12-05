import { gql } from "@apollo/client";
export const GET_PAYMENT_DETAIL = gql`
  query GetPaymentDetail($paymentId: ID!) {
    paymentDetail(id: $paymentId) {
      data {
        id
        attributes {
          invoiceRequired
          status
          total
          subtotal
          taxes
          deliveryId
          deliveryPayment
          deliveryMethod

          order_detail {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
