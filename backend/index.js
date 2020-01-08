import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import schema from "./schemas";
import resolvers from "./resolvers";
import userModel from "./models/userModel";
import productModel from "./models/productModel";

var json = require("./products.json");

const app = express();
app.use(cors());

const dbURI =
    "mongodb+srv://<Username>:<Password>@epsor-bon1x.mongodb.net/Epsor?retryWrites=true&w=majority";
mongoose.set("useCreateIndex", true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => console.log("Connected successfully to the database"));
mongoose.connection.on("error", err =>
    console.log("Error while connecting to the database: " + err)
);
mongoose.connection.on("disconnected", () => console.log("Disconnected from the database"));
process.on("SIGINT", () => {
    mongoose.connection.close(function() {
        console.log("Disconnected from the database through app termination");
        process.exit(0);
    });
});

productModel.deleteMany({}, (err, res) => {
    if (err) throw err;
    else console.log("Removed all previous items");
});
productModel.insertMany(json, err => {
    if (err) throw err;
    else console.log("Added all json objects into MongoDB");
});

const getUser = async req => {
    const token = req.headers["token"];

    if (token) {
        try {
            return await jwt.verify(token, "riddlemethis");
        } catch (e) {
            throw new AuthenticationError("Your session expired. Sign in again.");
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await getUser(req);
            return { me, models: { userModel, productModel } };
        }
    }
});

server.applyMiddleware({ app, path: "/graphql" }, bodyParser.json());

app.listen(4242, () => {
    console.log("Server listening on port 4242");
});
