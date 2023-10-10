import { gql } from '@apollo/client';

export const UPDATE_ADDRESS = gql`
mutation updateAddress( $country: String!,$postCode: String!,$province: String!, $addressLine1: String!,$addressLine2: String!,$canton: String!, $id: ID!) {
  updateUsersAddress (id: $id
    data:{
      country: $country
      postCode: $postCode
      province: $province
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      canton:$canton
      
    }
  ) {
    data: data {
      id
    }
}
}
`;


