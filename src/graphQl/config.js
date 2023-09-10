import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const URL_API = process.env.NEXT_PUBLIC_URL_API;

const link = createHttpLink({
    uri: URL_API,
    credentials: "include", // Using Cookies for login
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});
export default client;
