const express = require("express");
const router = express.Router();
const { ProductsController } = require("../controllers/products");
// const { protect } = require("../middleware/auth");
const upload= require("../middleware/upload");

router.get('/',ProductsController.getProducts);
router.get('/:id',ProductsController.getProductDetail);
router.delete('/:id',ProductsController.delete);
router.post('/',upload.single('photo'),ProductsController.insert);
router.put('/:id',upload.single('photo'),ProductsController.update);

module.exports = router;