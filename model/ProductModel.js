import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{type: String, required: true},
    type:{type: String, required: true},
    price:{type: String, required: true},
    discountedPrice:{type: String, required: true},
    companyName:{type: String, required: true},
    image:{type: String}
});


export default mongoose.model("Product",ProductSchema);