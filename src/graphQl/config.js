import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
const URL_API = process.env.URL_API;
const client = new ApolloClient({
    uri: URL_API,
    cache: new InMemoryCache(),
});

// import { ApolloClient, InMemoryCache } from '@apollo/client';
// const URL_API = process.env.URL_API;
// const client = new ApolloClient({
//     uri: URL_API,
//     cache: new InMemoryCache(),
// });

export default client;

// export const GET_PRODUCTS = gql`
//     query GetLocations {
//         products {
//             data {
//                 id
//                 attributes {
//                     name
//                 }
//             }
//         }
//     }
// `;
