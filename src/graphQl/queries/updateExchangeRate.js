import { gql } from "@apollo/client";

const UPDATE_EXCHANGE_RATE = gql`
mutation UpdateExchangeRate($exchangeRateId: ID!, $newPurchase: Float!, $newSale: Float!, $newDate: String!) {
    updateExchangeRate(id: $exchangeRateId, data: { purchase: $newPurchase, sale: $newSale, date: $newDate }) {
      data {
        id
        attributes {
            purchase
            sale
            date
        }
      }
    }
  }
`;

export default UPDATE_EXCHANGE_RATE