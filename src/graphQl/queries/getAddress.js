import { gql } from '@apollo/client';
export const GET_ADDRESS = gql`
query GetUserAdress ($id: ID!){
    usersPermissionsUser(id: $id){
    data{
      id
      attributes{
        firstName
        lastName
        phoneNumber
        email
        username
        users_address{
          data{
            id
            attributes{
              postCode
              country
              province
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

