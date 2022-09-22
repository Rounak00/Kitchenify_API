import UserSchema from "../model/UserModel.js"

const userController={
    async delUser(req,res,next){
      
        try{
         const result= await UserSchema.findByIdAndDelete(req.params.id);
         res.status(201).send(`User ID ${result} Deleted`);
        }catch(err){
          next(err);
        }
    },
    async getUsers(req,res,next){

        try{
         const result= await UserSchema.find();
         res.status(200).json(result);
        }catch(err){
            next(err)
        }
    },
    async getUser(req,res,next){
        try{
         const result=await UserSchema.findById(req.params.id);
         res.status(200).json(result); 
        }catch(err){
            next(err)
        }
    }

}
export default userController;