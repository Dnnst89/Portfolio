import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    connectToDevTools: true,
    uri: process.env.NEXT_PUBLIC_URL_API,
    cache: new InMemoryCache(),
});

export default client;