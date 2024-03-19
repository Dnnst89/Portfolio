import { gql } from "@apollo/client";

const GET_ERROR_INFO = gql`
  query GetErrorMsj($id: ID) {
    errorInformation(id: $id) {
      data {
        id
        attributes {
          error_number
          error_message
        }
      }
    }
  }
`;

export default GET_ERROR_INFO;
