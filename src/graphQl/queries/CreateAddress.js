import { gql } from '@apollo/client';

export const CreateAddress = gql`
mutation addAdress ($postCode: String!, $country: String!, $addressLine1: String!,$addressLine2: String!,$province: String!,$canton: String!, $user: ID!){
  createUsersAddress (
    data : {
      postCode: $postCode
      country: $country
      province: $province
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      user: $user
      canton: $canton
    }
  )
  {
    data : data {
      id
    }
  }
  }
`;


