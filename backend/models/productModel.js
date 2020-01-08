import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    enable: { type: Boolean, required: true }
});

const product = mongoose.model("Product", productSchema);
export default product;
