import { gql } from "@apollo/client";
import { Dela_Gothic_One } from "next/font/google";

const GET_DELIVERY_CHOICES = gql`
  query GetDeliveryInput {
    deliveries {
      data {
        id
        attributes {
          delivery_code
        }
      }
    }
  }
`;
export default GET_DELIVERY_CHOICES;
