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
      if (Id === "all") {
        product = await proModel.find({}); // for admin
      }
      if (Id && Id !== "*" && Id !== "all") {
        product = await proModel.findOne({
          _id: Id,
          is_active: true,
        });
      }
      //   console.log(product);
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
    const { name, category_id, detail, price, discount, image, is_active } =
      newProduct;
    const imageName = image.name;
    try {
      const newProduct = await proModel.create({
        name,
        category_id,
        price,
        discount,
        detail,
        image: imageName,
        is_active,
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
      // console.log(id);
      const updatedProduct = await proModel.findByIdAndUpdate(id, {
        name,
        category_id,
        price,
        discount,
        detail,
        image: image.name,
        date_create: Date.now(),
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

const changeActive = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { is_active } = data;
    // console.log(is_active);
    try {
      const check = await proModel.findById(id);
      if (check === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }
      const updateActive = await proModel.findByIdAndUpdate(id, {
        is_active,
      });
      if (updateActive) {
        resolve({
          errCode: 0,
          message: "Update successed",
        });
      }
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
  changeActive,
};
