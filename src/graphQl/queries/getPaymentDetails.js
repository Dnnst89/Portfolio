import { gql } from "@apollo/client";

export const GET_PAYMENT_DETAILS = gql`
  query GetUserOrders($userId: ID!) {
    usersPermissionsUser(id: $userId) {
      data {
        id

        attributes {
          firstName
          lastName
          phoneNumber
          users_address {
            data {
              attributes {
                province
                canton
              }
            }
          }
          order_details {
            data {
              id
              attributes {
                total
                status
              }
            }
          }
          users_address {
            data {
              id
              attributes {
                country
                postCode
                addressLine1
                addressLine2
                canton
              }
            }
          }
        }
      }
    }
  }
`;
