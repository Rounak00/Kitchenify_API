import express from "express";
import  connection  from "./utils/connection.js";
import {PORT} from "./config/config.js"
import routes from "./routes/routes.js"
const app=express();
app.use(express.json());
app.use(routes);


app.listen(PORT, async()=>{
   console.log(`Server running at: ${PORT}`);
   await connection();
})