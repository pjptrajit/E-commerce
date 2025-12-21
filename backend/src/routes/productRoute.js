import express from "express";
import createProduct, { deleteProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import { getAllProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/createProduct", upload.single('image'),createProduct);
productRouter.get("/getAllProduct",getAllProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);
productRouter.put("/updateProduct/:id", upload.single('image'), updateProduct);


export default productRouter;