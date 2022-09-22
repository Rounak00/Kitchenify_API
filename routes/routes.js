import express from "express";
const routes= express.Router();


//auth routes
routes.post("/register", registerController.register)
routes.post("/login",loginController.login)

//User routes
routes.get("/user/:id",userController.getUser)
routes.get("/user",verifyAdmin,userController.getUsers)
routes.delete("/user/:id",verifyAdmin,userController.delUser)

//productroutes
routes.post("/product",productController.addProduct)
routes.delete("/product/:id",verifyAdmin,productController.delProduct)
routes.put("/product/:id",verifyAdmin,productController.updateProduct)
routes.get("/product",productController.getProducts)
routes.get("/product/:id",productController.getProduct)



export default routes;