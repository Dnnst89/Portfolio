import { gql } from "@apollo/client";

const CREATE_PAYMENT_DETAIL = gql`
  mutation (
    $status: String
    $subtotal: Float
    $taxes: Float
    $total: Float
    $invoiceRequired: Boolean
    $deliveryMethod: String
    $deliveryPayment: Float
    $deliveryId: Int
    $paymentMethod: String
    $estimate_delivery_date: String
    $publishedAt: DateTime
    $orderNumber: Long
    $gift: String
  ) {
    createPaymentDetail(
      data: {
        status: $status
        subtotal: $subtotal
        taxes: $taxes
        total: $total
        invoiceRequired: $invoiceRequired
        deliveryMethod: $deliveryMethod
        deliveryPayment: $deliveryPayment
        deliveryId: $deliveryId
        paymentMethod: $paymentMethod
        estimate_delivery_date: $estimate_delivery_date
        publishedAt: $publishedAt
        orderNumber: $orderNumber
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
          orderNumber
        }
      }
    }
  }
`;
export default CREATE_PAYMENT_DETAIL;
