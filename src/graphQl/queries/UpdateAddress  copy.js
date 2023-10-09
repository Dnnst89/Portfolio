import { gql } from '@apollo/client';

export const updateUserInformation = gql`
mutation updateUserInformation($firstName: String!,$lastName:String!, $phone: Int!, $email:String, $user: ID! ){
  updateUsersPermissionsUser(id: $user
  data:{
    firstName: $firstName
    lastName: $lastName
    phoneNumber: $phone
    email:$email
  }
  )
  {data: data { id }}
  }
`;


