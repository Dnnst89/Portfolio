import { gql } from "@apollo/client";

const CREATE_EXCHANGE_RATE = gql`
mutation (
    $purchase: Float
    $sale: Float
    $date: String
    $publishedAt: DateTime
  ) {
    createExchangeRate(
      data: {
        purchase: $purchase
        sale: $sale
        date: $date
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          purchase
          sale
          date
          publishedAt
        }
      }
    }
  }


`;

export default CREATE_EXCHANGE_RATE