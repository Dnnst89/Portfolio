import { gql } from '@apollo/client';

export const GET_USER_ADDRESS = gql`
query GetUserAddress($id: ID){
    usersPermissionsUser(id:$id) {
      data{
        id,
        attributes{
          username
          users_address{
            data{
              id,
              attributes{
                country,
                canton,
                province,
                addressLine1,
                addressLine2,
                country
              }
              }
            }
          }
        }
      }
    }
    `;