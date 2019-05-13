import ClassUserController from '../controller/ClassUserController';
const express = require("express");
const router = express.Router();
let classUserController = new ClassUserController();
router.get("/", classUserController.getAll);
router.post("/", classUserController.createClassUser);
router.get("/class-id",classUserController.getClassByIdUser);
router.get("/class-idClass", classUserController.getClassByIdClass);
router.post('/edit-classUser', classUserController.editClassUser)
router.get("/class-tutor", classUserController.getClassInfoAndTutor);
router.get("/class-tutor-by-idTutor", classUserController.getClassInfoAndTutorByIdTutor);
router.get("/class-tutor-by-id-status", classUserController.getClassInfoAndTutorByStatusAndId);
router.get("/class-user", classUserController.getClassInfoAndUser);
router.get("/search-notification", classUserController.searchClassUser);
module.exports = router;