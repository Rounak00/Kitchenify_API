import UserSchema from "../../model/UserModel.js"
import bcrypt from "bcrypt"

const registerController={
    async register(req,res,next){
        const {name,password,email,address,isAdmin,image}=req.body; 
        
        try{       
             //hashing
        const saltNum = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, saltNum)
         console.log(hashPassword);
        const newUser= new UserSchema({
            name:name,
            email:email,
            password: hashPassword,
            address: address,
            isAdmin: isAdmin,
            image: image 
        });
          await newUser.save();
          res.status(201).send("Profile Created, Please LogIN")
        }catch(error){
            next(error);
        }
    }

}
export default registerController;