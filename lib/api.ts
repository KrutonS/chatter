import { ApolloClient, InMemoryCache } from "@apollo/client";
import apiToken from "../token";

const widlarzClient = new ApolloClient({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiToken}`,
  },
});

export default widlarzClient;

export const userFrag = `
user {
	id
	firstName
	email
	lastName
	role
}`;
