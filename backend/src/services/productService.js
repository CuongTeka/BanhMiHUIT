const proModel = require("../models/productModel");

//get product
let getProduct = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = "";
      if (Id === "*") {
        product = await proModel.find({
          is_active: true,
        });
      }
      if (Id && Id !== "*") {
        product = await proModel.findOne({
          _id: Id,
          is_active: true,
        });
      }
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}; //which is always get active product
let getProductByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = "";
      if (name) {
        const regex = new RegExp(name, "i");
        product = await proModel.find({
          name: regex,
          is_active: true,
        });
      }
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
};

//create - update - delete
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, category_id, detail, price, discount, image } = newProduct;
    const imageName = image.name;
    try {
      const newProduct = await proModel.create({
        name,
        category_id,
        price,
        discount,
        detail,
        image: imageName,
      });
      if (newProduct) {
        resolve({
          errCode: 0,
          message: "Insert Successed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}; //done
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { name, category_id, detail, price, discount, image, is_active } =
      data;
    try {
      const checkProduct = await proModel.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }

      const updatedProduct = await proModel.findByIdAndUpdate(id, {
        name,
        category_id,
        detail,
        price,
        discount,
        image,
        date_edit: Date.now(),
        is_active,
      });
      if (updatedProduct) {
        resolve({
          errCode: 0,
          message: "Update successed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}; //done
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await proModel.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }

      await proModel.findByIdAndDelete(id);
      resolve({
        errCode: 0,
        message: "Delete product successed",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //done
const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await proModel.deleteMany({ _id: ids });
      resolve({
        errCode: "0",
        message: "Delete products successed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getProduct,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
};
