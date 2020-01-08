import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
});

userSchema.pre("save", function() {
    const hashPassword = bcrypt.hashSync(this.password, 12);
    this.password = hashPassword;
});

const user = mongoose.model("User", userSchema);

export default user;
