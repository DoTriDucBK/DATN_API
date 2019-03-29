import ClassUserController from '../controller/ClassUserController';
const express = require("express");
const router = express.Router();
let classUserController = new ClassUserController();
router.get("/", classUserController.getAll);
router.post("/", classUserController.createClassUser);
router.get("/class-id",classUserController.getClassByIdUser);

module.exports = router;