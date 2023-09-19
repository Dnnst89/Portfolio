import { gql } from '@apollo/client';

const RegisterUser = gql`
mutation registerUser($username: String!, $email: String!, $password: String! ) {
    register(
      input:{
        username: $username
        email: $email
        password: $password
      }
    ) {
      user {
        id
        username
        email
        confirmed
      }
      jwt
      
    }
  }
`;

export default RegisterUser;
