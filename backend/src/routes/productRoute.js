import express from "express";
import createProduct from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const productRouter = express.Router();

productRouter.post("/createProduct", upload.single('image'),createProduct);


export default productRouter;