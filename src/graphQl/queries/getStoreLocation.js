import { gql } from "@apollo/client";

const GET_STORE_LOCATION = gql`
  query GetStoreInformation($id: ID!) {
    storeInformation(id: $id) {
      data {
        attributes {
          latitude
          longitude
          delivey_distance_range
        }
      }
    }
  }
`;

export default GET_STORE_LOCATION;
