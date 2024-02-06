import { gql } from "@apollo/client";

const GET_DELIVERY_CHOICES = gql`
  query GetDeliveryInput {
    deliveries {
      data {
        id
        attributes {
          delivery_code
          long_distance_price
          short_distance_price
          short_estimate_delivery_date
          long_estimate_delivery_date
        }
      }
    }
  }
`;
export default GET_DELIVERY_CHOICES;
