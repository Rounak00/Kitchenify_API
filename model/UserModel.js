import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    password:{type: String, required:true},
    email:{type: String, required: true, unique: true},
    address:{type: String, required: true},
    isAdmin:{type: Boolean, required:true},
    image:{type: String}
});


export default mongoose.model("User",UserSchema);