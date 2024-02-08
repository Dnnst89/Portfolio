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
    $estimate_delivery_date: String
    $publishedAt: DateTime
    $gift: String
  ) {
    createPaymentDetail(
      data: {
        status: $status
        subtotal: $subTotal
        taxes: $taxes
        total: $total
        invoiceRequired: $invoiceRequired
        deliveryMethod: $deliveryMethod
        deliveryPayment: $deliveryPayment
        deliveryId: $deliveryId
        paymentMethod: $paymentMethod
        estimate_delivery_date: $estimate_delivery_date
        publishedAt: $publishedAt
        gift: $gift
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
          deliveryPayment
          deliveryId
          estimate_delivery_date
          publishedAt
          gift
        }
      }
    }
  }
`;
export default CREATE_PAYMENT_DETAIL;
