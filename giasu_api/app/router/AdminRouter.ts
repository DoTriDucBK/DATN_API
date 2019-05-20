import AdminController from '../controller/AdminController';
const express = require("express");
const router = express.Router();
let adminController = new AdminController();
router.get("/", adminController.getAll);
router.get('/verifyAuth', adminController.getAdminByToken);
router.post('/signup', adminController.postSignup);
router.put('/login', adminController.putLogin);
router.put('/logout', adminController.putLogout);
router.put('/edit', adminController.putUpdateAdmin);
router.put('/change-password', adminController.putChangePassword)
router.post('/edit-admin', adminController.editAdmin);
router.get('/get-admin-id', adminController.getAdminByIdAdmin);
router.get('/get-admin-name', adminController.getAdminByName);
module.exports = router;