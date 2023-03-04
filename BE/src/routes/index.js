const express = require('express');
const router = express.Router();
const UsersRouter = require('../routes/users');
const ProductRouter = require('../routes/products');

router.use("/users",UsersRouter);
router.use("/product",ProductRouter);

module.exports = router;