import {DB} from "../config/config.js"
import mongoose from "mongoose"

const connection=async()=>{
    try{
        await mongoose.connect(DB);
        console.log("DB is Connected...");
    }catch(error){
        console.log("Problem detected at connection file", error.message);
    }
}
export default connection;