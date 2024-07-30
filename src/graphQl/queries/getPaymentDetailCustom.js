import { gql } from "@apollo/client";
export const GET_PAYMENT_DETAIL_CUSTOM = gql`
 query GetPaymentDetail($paymentId: Long) {
    paymentDetails(filters: { orderNumber: { eq: $paymentId } }) {
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
          orderNumber
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
