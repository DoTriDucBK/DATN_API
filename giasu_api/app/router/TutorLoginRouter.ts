import TutorLoginController from '../controller/TutorLoginController';
const express = require("express");
const router = express.Router();
let tutorLoginController = new TutorLoginController();
router.get("/", tutorLoginController.getAll);
router.get('/verifyAuth', tutorLoginController.getUserByToken);
router.get('/:user_account_id', tutorLoginController.getOne);
router.post('/signup', tutorLoginController.postSignup);
router.put('/login', tutorLoginController.putLogin);
router.put('/logout', tutorLoginController.putLogout);
router.put('/edit', tutorLoginController.putUpdateUser);
router.put('/change-password', tutorLoginController.putChangePassword)

module.exports = router;