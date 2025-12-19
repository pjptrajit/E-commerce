import express from "express";
import createProduct, { deleteProduct } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import { getAllProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/createProduct", upload.single('image'),createProduct);
productRouter.get("/getAllProduct",getAllProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);


export default productRouter;