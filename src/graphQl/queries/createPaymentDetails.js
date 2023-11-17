import { gql } from "@apollo/client";

const CREATE_PAYMENT_DETAIL = gql`
  mutation (
    $status: String
    $subTotal: Float
    $taxes: Float
    $total: Float
    $invoiceRequired: Boolean
    $deliveryMethod: String
    $deliveryPayment: Float
    $deliveryId: Int
    $paymentMethod: String
    $publishedAt: DateTime
  ) {
    createPaymentDetail(
      data: {
        status: $status
        subtotal: $subTotal
        taxes: $taxes
        total: $total
        invoiceRequired: $invoiceRequired
        deliveryMethod: $deliveryPayment
        deliveryPayment: $deliveryId
        deliveryId: $deliveryMethod
        paymentMethod: $paymentMethod
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          total
          status
          subtotal
          taxes
          invoiceRequired
          deliveryMethod
          paymentMethod
          publishedAt
        }
      }
    }
  }
`;
export default CREATE_PAYMENT_DETAIL;
