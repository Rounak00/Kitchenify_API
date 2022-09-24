import ProductSchema from "../model/ProductModel.js"
import customErrorHandler from "../services/customErrorHandler.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// diskStorage
const storage = multer.diskStorage({
  // cb is a general function, it's called call back
destination: (req, file, cb) => cb(null, "uploads/"),
filename: (req, file, cb) => {
  // 1660889102382-97732441.png
  const uniqueName = `${Date.now()} - ${Math.round(
    Math.random() * 1e9
  )}${path.extname(file.originalname)}`;

      cb(null,uniqueName);
},
});

const handleMultipartData = multer({
  storage:storage,
  limits: { fileSize: 1000000*5}
}).single("image");

const productController={
    async addProduct(req,res,next){
      handleMultipartData(req, res, async(err) => {
        if(err){
            return next(customErrorHandler.imageUploadIssue());
        }
        console.log(req.file);
        const {name, type, price, discountedPrice, companyName} = req.body;
        let filePath;
        if(req.file){ filePath = req.file.path;}
       
        try{
          const newProduct= new ProductSchema({name,type,price,discountedPrice,companyName,image:filePath});
          const saveData=await newProduct.save();
          res.status(201).json(saveData);
        }catch(err){
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
              console.log("Deleted");
           })
           next(err)
        }
    })
  },

    async delProduct(req,res,next){
      handleMultipartData(req, res, async(err) => {
        if(err){
            return next(customErrorHandler.imageDeleteIssue());
        }
        const id=req.params.id
        const data=await ProductSchema.findById({_id:id});
        fs.unlink(`${appRoot}/${data.image}`, (err) => {
          console.log("Deleted");
       })
        try{
          await ProductSchema.findByIdAndDelete({_id:id});
          res.status(201).json("product Removed");
        }catch(err){
           next(err)
        }
    })
    },
    async updateProduct(req,res,next){
      handleMultipartData(req,res,async(error)=>{
        if (error) {
           return next(customErrorHandler.imageUpdateIssue());
        }
        const product_id = req.params.id;
        const {name, type, price, discountedPrice, companyName} = req.body;
        let filepath;

        if (req.file) {
            const data = await ProductSchema.findById({_id:product_id});
            fs.unlink(`${appRoot}/${data.image}`,(error)=>{
                console.log("image deleted");
            });
            filepath = req.file.path;

        }

        try {
           const newData=await ProductSchema.findByIdAndUpdate(
            {_id:product_id},{
              name:name,
              type:type, 
              price:price, 
              discpountedPrice:discountedPrice, 
              companyName:companyName,
                  ...(req.file && {image:filepath}),
            },{new:true}
           );
           res.status(200).json(newData);
        }catch(err){
          next(err);
        }
    });
},
async getProducts(req,res,next){
  console.log(req.user.id)
  try{
    const result=await ProductSchema.find()
    res.status(200).json(result);
  }catch(err){
    next(err);
  }
},
async getProduct(req,res,next){

  try{
    const result=await ProductSchema.findById(req.params.id);
    res.status(200).json(result);
  }catch(err){
    next(err);
  }
}
};
          

export default productController;
