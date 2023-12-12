import { gql } from '@apollo/client';

const GetCategories = gql`
query GetCategories {
    categories {
        data {
            id
            attributes {
                name
            }
        }
    }
}
`;

export default GetCategories;
