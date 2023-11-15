const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productCtrl");
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

//router.post("/", isAuthenticated, isAdmin, createProduct);
router.post("/", createProduct);
router.get("/product/:id", getaProduct);

//router.put("/product/:id", isAuthenticated, isAdmin, updateProduct);
router.put("/product/:id",  updateProduct);
//router.delete("/product/:id", isAuthenticated, isAdmin, deleteProduct);
router.delete("/product/:id", deleteProduct);
router.get("/product", getAllProduct);

module.exports = router;
