import Product from "../models/productModel.js";

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

    // let productInfo = new Product({
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
export default createProduct;
