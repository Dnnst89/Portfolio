import { gql } from "@apollo/client";

export const CREATE_ELECTRONIC_INVOICE = gql`
  mutation createElectronicInvoice(
    $order: Int!
    $consecutive: Long!
    $keyInvoice: Long!
    $activityCode: Int!
    $publishedAt: DateTime!
  ) {
    createElectronicInvoice(
      data: {
        order_detail_id: $order
        consecutive: $consecutive
        keyInvoice: $keyInvoice
        ActivityCode: $activityCode
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
      }
    }
  }
`;
