import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export default {
    Query: {
        login: async (parent, { email, password }, { models: { userModel } }, info) => {
            const user = await userModel.findOne({ email }).exec();
            if (!user) throw new AuthenticationError("No user with this email found");
            const pswd = bcrypt.compareSync(password, user.password);
            if (!pswd) throw new AuthenticationError("Wrong password");
            const token = jwt.sign({ id: user.id }, "riddlemethis", { expiresIn: 24 * 10 * 50 });
            const resUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            return { user: resUser, token: token };
        }
    },
    Mutation: {
        createUser: async (parent, { email, name, password }, { models: { userModel } }, info) => {
            const user = await userModel.create({ email, name, password });
            return user;
        }
    }
};
