const express = require('express');
const router = express.Router();
const {UsersController} = require('./../controllers/users');
const {protect} = require ('../middleware/auth');

router.post("/register", UsersController.insert);
router.post("/login", UsersController.login);
router.get("/",protect, UsersController.getAll);
router.get("/get", UsersController.get);

module.exports = router;
