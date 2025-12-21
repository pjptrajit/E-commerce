import Product from "../models/productModel.js";
import fs from "fs";
import path from "path";

async function createProduct(req, res) {
  const { name, price, description } = req.body;
  const image = req.file.filename;

  if (!name || !price || !description || !image) {
    res.status(400).json({ status: 400, error: "plz. fill all field" });
    return;
  }
  try {
    let productInfo = new Product({
      name,
      price,
      description,
      image,
    });
    productInfo = await productInfo.save();

    // let productInfo = await new Product({
    //   name,
    //   price,
    //   description,
    //   image
    // }).save();

    if (!productInfo) {
      res
        .status(500)
        .json({ status: 500, error: "Error while saving product info ! " });
    }

    res.status(201).json({
      status: 201,
      message: "Product created   successfully",
      productInfo: productInfo,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server error ! " });
  }
}

export async function getAllProduct(req, res) {
  let productInfo = await Product.find();

  if (!productInfo) {
    res.status(404).json({ status: 404, message: "Data not found!," });
  }
  try {
    res
      .status(200)
      .json({
        status: 200,
        message: "Product found!",
        productInfo: productInfo,
      });
  } catch (error) {
    res.status(404).json({ status: 404, message: `Data not found!: ${error}` });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    let productInfo = await Product.findByIdAndDelete({ _id: id });

    const imagePath = path.join(
      process.cwd(),
      "../public/images",
      productInfo.image
    );
    if (fs.existsSync(imagePath)) {
      //  fs.unlink(imagePath, (err)=>{
      //   if(err){
      //     console.log(err);
      //   }
      // })

      fs.unlinkSync(imagePath);
    }

    res
      .status(201)
      .json({
        status: 201,
        message: "Producted Deleted Successfully",
        productInfo: productInfo,
      });
  } catch (error) {
    res.status(404).json({ status: 404, message: `Error: ${error.message}` });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    // keep old image by default
    let imageName = product.image;

    // ✅ if new image uploaded
    if (req.file) {
      const oldImagePath = path.join(
        process.cwd(),
        "../public/images",
        product.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      imageName = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        image: imageName,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

export default createProduct;
