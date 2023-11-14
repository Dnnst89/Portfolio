import { gql } from "@apollo/client";

export const CREATE_ELECTRONIC_INVOICE = gql`
  mutation createElectronicInvoice(
    $order: String!
    $consecutive: String!
    $keyInvoice: String!
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
