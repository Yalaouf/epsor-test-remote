import { gql } from "apollo-server";

export default gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Res {
        user: User!
        token: String!
    }

    extend type Query {
        login(email: String!, password: String!): Res!
    }

    extend type Mutation {
        createUser(email: String!, name: String!, password: String!): User!
    }
`;
