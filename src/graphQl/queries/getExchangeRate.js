import { gql } from '@apollo/client';

const GET_EXCHANGE_RATE = gql`
query ExchangeRates {
    exchangeRates {
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
export default GET_EXCHANGE_RATE;