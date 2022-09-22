import UserSchema from "../../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_Secret } from "../../config/config.js"
import customErrorHandler from "../../services/customErrorHandler.js"

const loginController={
    async login(req,res,next){
		const {email,password}=req.body;
        try{
            const isExist = await UserSchema.findOne({ email: email });
			if (!isExist) {
				return next(customErrorHandler.unAuthorizedUser("user is not exxist"));
			}

			// compare your password
			const newUser = bcrypt.compareSync(req.body.password, isExist.password);
			if (!newUser) {
				return next(customErrorHandler.wrongCredentials());
			}

			// generate token
			const generateToken = jwt.sign({
				id: isExist._id,
				isAdmin: isExist.isAdmin
			}, JWT_Secret)

            const {password,isAdmin,__v, ...other} = isExist._doc

            res.cookie("access_token",generateToken, { httpOnly: true}).status(201).json(other);
        }catch(err){
            next(err);
        }
    }
}
export default loginController;