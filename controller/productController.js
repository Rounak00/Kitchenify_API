import ProductSchema from "../model/ProductModel.js"

const productController={
    async addProduct(req,res,next){
        const newProduct= new ProductSchema(req.body);
        try{
          await newProduct.save();
          res.status(201).send("Producted added successfully");
        }catch(err){
           next(err)
        }
    },
    async delProduct(req,res,next){
        const id=req.params.id
      try{
         await ProductSchema.findByIdAndDelete(id)
         res.status(201).send("Product Removed")
      }catch(err){
        next(err);
      }
    },
    async updateProduct(req,res,next){
        const id=req.params.id
        const update=req.body
      try{
       const result= await ProductSchema.findByIdAndUpdate(id,update,{new:true});
       res.status(201).send("Product Modified").json({result})
      }catch(err){
          next(err);
      }
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
}

export default productController;