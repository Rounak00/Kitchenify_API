import express from "express";
import  connection  from "./utils/connection.js";
import {PORT} from "./config/config.js"
import routes from "./routes/routes.js"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler.js"
const app=express();
app.use(express.json());

global.appRoot = path.resolve(__dirname);
app.use(bodyParser.urlencoded({ extended: false })); // come in base 64 which is not supported by rest

app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, async()=>{
   console.log(`Server running at: ${PORT}`);
   await connection();
})