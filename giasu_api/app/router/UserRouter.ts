import UserController from '../controller/UserController';
const express = require("express");
const router = express.Router();
let userController = new UserController();
router.get("/", userController.getAll);
router.get('/verifyAuth', userController.getUserByToken);
router.get('/:user_account_id', userController.getOne);
router.post('/signup', userController.postSignup);
router.put('/login', userController.putLogin);
router.put('/logout', userController.putLogout);
router.put('/edit', userController.putUpdateUser);
router.put('/change-password', userController.putChangePassword)
router.post('/edit-user', userController.editUser);
router.put('/delete-user', userController.deleteUser)
module.exports = router;