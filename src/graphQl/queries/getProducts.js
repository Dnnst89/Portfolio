import { gql } from '@apollo/client';

const GetProductsList = gql`
    query GetProducts {
        products {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;

export default GetProductsList;
