const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const homeController = require("../controllers/homeController");
const cateController = require("../controllers/cateController");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

//thứ tự:
//get
//create
//update
//delete

//user
router.get("/get-all-user", userController.handleGetAllUser);
router.get("/get-user-by-id/:id", userController.handleFindUserById);
router.put("/update-user/:id", userController.updateUser);
router.put("/change-user-password/:id", userController.hangleChangePassword);
router.put("/change-user-info/:id", userController.handleChangeUserInfo);
router.delete("/delete-user/:id", userController.deleteUser);
router.post("/delete-many-user", userController.deleteMany);
//product
router.get("/get-all-product", productController.handleGetAllProduct);
router.get("/get-product-by-id/:id", productController.handleGetProductById);
router.get(
  "/get-product-by-name/:name",
  productController.handleGetProductByName
);
router.post("/create-product", productController.createProduct);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.post("/delete-many-product");
router.put("/change-active/:id", productController.updateActive);
//category
router.get("/get-all-category", cateController.handleGetAllCategory);
router.get("/get-category-by-id", cateController.handleGetCategoryById);

//order
router.get("/get-all-order", orderController.handleGetAllOrder);
router.get("/get-order-by-id/:id", orderController.handleGetOrderById);
router.get(
  "/get-order-by-customer-id/:id",
  orderController.handleGetOrderByCustomerId
);
router.get(
  "/get-order-by-customer-name/:name",
  orderController.handleGetOrderByCustomerName
);
router.post("/create-order", orderController.handleCreateOrder);
router.put("/update-order/:id", orderController.handleUpdateOrder);
router.put("/update-status/:id", orderController.handleUpdateStatus);
router.put("/update-request/:id", orderController.handleUpdateRequest);
//feedback
router.get("/get-all-feedback");
router.get("/get-feedback-by-product-id");
router.get("/get-feedback-by-user-id");
router.post("/create-feedback");
router.post("/update-feedback");
router.get("/delete-feedback");

//ultility
router.post("/signin", authController.checkLogin);
router.post("/signup", homeController.registerFunction);
router.get("/images/", homeController.handleGetProductImage);
router.post(
  "/upload",
  productController.upload.single("image"),
  productController.handleResImageUpload
);

router.get("/send/", homeController.handleSendEmail);
router.post("/check-otp", homeController.handleCheckOTP);
router.post("/forget-change", homeController.handleChangePassForget);

module.exports = router;
