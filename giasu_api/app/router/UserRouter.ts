import UserController from '../controller/UserController';
const express = require("express");
const router = express.Router();
let userController = new UserController();
router.get("/", userController.getAll);
// router.get("/class-sub",classInfoController.getClassBySubject);
router.post('/signup', userController.postSignup);
router.put('/login', userController.putLogin);

module.exports = router;