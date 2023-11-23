import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        console.log("credentials", email, password);

        const data = await client.query({
          query: gql`
            query GetUserInfo($email: String!) {
              login(email: $email) {
                _id
                first_name
                last_name
                email
                password
              }
            }
          `,
          variables: {
            email: email,
          },
        });

        if (data.data?.login) {
          if (data.data?.login?.password === password) {
            return {
              id: data.data?.login?._id,
              email: data.data?.login?.email,
            };
          } else {
            return null;
          }
        } else {
          // Email not found, return an email not found error
          return null;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
