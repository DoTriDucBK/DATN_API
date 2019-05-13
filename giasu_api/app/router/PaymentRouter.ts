import PaymentController from '../controller/PaymentController';
const express = require("express");
const router = express.Router();
let paymentController = new PaymentController();
router.get("/", paymentController.getAll);
router.post("/", paymentController.createPayment);
router.get("/idUser",paymentController.getPaymentByIdUser);
router.post('/edit-payment', paymentController.editPayment)
module.exports = router;