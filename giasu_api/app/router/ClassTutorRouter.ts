import ClassTutorController from '../controller/ClassTutorController';
const express = require("express");
const router = express.Router();
let classTutorController = new ClassTutorController();
router.get("/", classTutorController.getAll);
router.post("/", classTutorController.createClassTutor);
router.get("/class-id",classTutorController.getClassByIdUser);
router.get("/class-tutor-by-idTutor", classTutorController.getClassInfoAndTutorByIdTutor);
router.post('/edit-classTutor', classTutorController.editClassTutor);
router.get("/search-notification", classTutorController.searchNotification);
router.get("/class-idTutor",classTutorController.getClassByIdTutor);
module.exports = router;