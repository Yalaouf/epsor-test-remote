import { AuthenticationError } from "apollo-server";

export default {
    Query: {
        products: async (parent, args, { models: { productModel }, me }, info) => {
            if (!me) throw new AuthenticationError("You are not logged in");
            const products = await productModel.find({}).exec();
            return products;
        }
    },
    Mutation: {
        createProduct: async (
            parent,
            { uuid, name, price, type, enable },
            { models: { productModel }, me },
            info
        ) => {
            if (!me) throw new AuthenticationError("You are not logged in");
            const product = productModel.create({ uuid, name, price, type, enable });
            return product;
        },
        updateProduct: async (
            parent,
            { id, uuid, name, price, type, enable },
            { models: { productModel }, me },
            info
        ) => {
            if (!me) throw new AuthenticationError("You are not logged in");
            const product = productModel
                .findByIdAndUpdate(
                    { _id: id },
                    { uuid: uuid, name: name, price: price, type: type, enable: enable },
                    { new: true, useFindAndModify: false }
                )
                .exec()
                .then()
                .catch(() => {
                    throw new Error("Failed to update the product");
                });
            return product;
        },
        removeProduct: async (parent, { id }, { models: { productModel }, me }, info) => {
            if (!me) throw new AuthenticationError("You are not logged in");
            const res = productModel
                .deleteOne({ _id: id })
                .exec()
                .then(() => {
                    return "Product removed";
                })
                .catch(() => {
                    return "Failed to removed product";
                });
            return res;
        }
    }
};
