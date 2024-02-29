import { gql } from "@apollo/client";

export const GET_USER_PAYMENT_INFO = gql`
  query GetUserAdress($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          firstName
          lastName
          phoneNumber
          username
          invoiceEmail
          idCard {
            idType
            idNumber
          }
          users_address {
            data {
              id
              attributes {
                postCode
                country
                province
                addressLine1
                addressLine2
                canton
                latitude
                longitude
              }
            }
          }
        }
      }
    }
  }
`;
