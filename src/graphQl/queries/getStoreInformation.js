import { gql } from "@apollo/client";

const GET_STORE_INFO = gql`
  query GetStoreInformation($id: ID!) {
    storeInformation(id: $id) {
      data {
        attributes {
          name
          ActivityCode
          accountId
          IdType
          IdNumber
          ComercialName
          country
          province
          canton
          district
          otherSigns
          email
          neighborhood
          currency
          phoneNumber
          latitude
          longitude
        }
      }
    }
  }
`;

export default GET_STORE_INFO;
