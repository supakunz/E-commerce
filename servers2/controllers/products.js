const modelSchema = require("../models/Models");
const { cloudinary } = require('../utils/cloudinary');

const getAllProducts = async (req, res) => {
  try {
    let products = await modelSchema.find({});
    console.log("All Products Fetched");
    res.send(products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createProducts = async (req, res) => {
  try {
    let fileStr = req.body.image;
    let image_id;

  if (fileStr != '/products/noimage.jpg') {
    const uploadedResponse = await 
    cloudinary.uploader.upload(fileStr, {
              upload_preset: 'profile_pic'
          });

    console.log(uploadedResponse)
    fileStr = uploadedResponse.url
    image_id = uploadedResponse.public_id
  }

  let id;
  let products = await modelSchema.find({});
  // Logic Auto increment ID
  if (products.length > 0) {
    // ถ้า db มีข้อมูล
    let last_product_array = products.slice(-1); //เอาแค่ตัวสุดท้ายมา
    let last_product = last_product_array[0];
    id = last_product.id + 1; // เข้าถึง id แล้วบวกไอดีต่อไป
  } else {
    id = 1;
  }
  
  const product = new modelSchema({
    id: id,
    name: req.body.name,
    image: fileStr ,
    image_id: image_id,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    data: req.body.data,
    avilable: req.body.avilable,
  });
  console.log(product);
  // Save on Database
  await product.save();
  res.json({ success: true, message:"Create Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong' })
  }
}

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params
    const response = req.body
    let fileStr = req.body.image;
    const products = await modelSchema.findOne({ id });

    const data = {
      id: id,
      name: response.name,
      image: fileStr ,
      category: response.category,
      new_price: response.new_price,
      old_price: response.old_price,
    }

    if (products.image !== fileStr) {
      await cloudinary.uploader.destroy(products.image_id)
      const uploadedResponse = await 
      cloudinary.uploader.upload(fileStr, {
              upload_preset: 'profile_pic'
          });

    data.image = uploadedResponse.url
    data.image_id = uploadedResponse.public_id
    }
    const updated = await modelSchema.findOneAndUpdate({ id }, data, { new: true })
    console.log(updated)
    res.json({ message: "Update Successfully" })
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

const deleteProducts = async (req, res) => {
  try {
    const response = await modelSchema.findOneAndDelete({ id: req.body.id });
    
    await cloudinary.uploader.destroy(response.image_id)
    console.log("Remove");
    res.json({ success: true, message:"Remove Successfully" });
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

// ------------ Use Params ---------------- //

const getProductsID = async (req, res) => {
  try {
    const { id } = req.params
    let products = await modelSchema.find({ id });
    console.log("Products_ID Fetched");
    res.json(products)
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

module.exports = {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  getProductsID
}