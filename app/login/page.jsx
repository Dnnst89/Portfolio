"use client";

import LoginForm from "@/components/LoginForm";
import GET_USERS from "@/src/graphQl/queries/getUsers";
import { useQuery } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
/*
    Authentication -->
*/
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_URL_API,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    console.log(token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const LogInPage = () => {
    const {
        loading,
        error,
        data: { currentUser },
    } = useQuery(GET_USERS, { fetchPolicy: "Network-only" });
    console.log(data);
    return (
        <>
            <LoginForm lading={loading} error={error} data={data} />
        </>
    );
};

export default LogInPage;
