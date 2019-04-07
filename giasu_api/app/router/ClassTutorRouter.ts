import ClassTutorController from '../controller/ClassTutorController';
const express = require("express");
const router = express.Router();
let classTutorController = new ClassTutorController();
router.get("/", classTutorController.getAll);
router.post("/", classTutorController.createClassTutor);
router.get("/class-id",classTutorController.getClassByIdUser);

module.exports = router;