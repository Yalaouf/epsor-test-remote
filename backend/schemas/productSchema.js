import { gql } from "apollo-server";

export default gql`
    type Product {
        id: String!
        uuid: String!
        name: String!
        price: Float!
        type: String!
        enable: Boolean!
    }

    extend type Query {
        products: [Product!]!
    }

    extend type Mutation {
        createProduct(
            uuid: String!
            name: String!
            price: Float!
            type: String!
            enable: Boolean!
        ): Product!
        updateProduct(
            id: String
            uuid: String!
            name: String!
            price: Float!
            type: String!
            enable: Boolean!
        ): Product!
        removeProduct(id: ID!): String!
    }
`;
