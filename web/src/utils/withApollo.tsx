import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createApollo } from "next-apollo";

const client = new ApolloClient({
  credentials: "include",
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/api",
});

export const withApollo = createApollo(client);
