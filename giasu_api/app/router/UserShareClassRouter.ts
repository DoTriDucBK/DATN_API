import UserShareClassController from '../controller/UserShareClassController';
const express = require("express");
const router = express.Router();
let userShareClassController = new UserShareClassController();
router.get("/", userShareClassController.getAll);
router.post("/", userShareClassController.createUserShareClass);
router.get("/class-id",userShareClassController.getClassByIdUser);
router.get("/class-idClass", userShareClassController.getClassByIdClass);
router.post('/edit-classUser', userShareClassController.editClassUser)
router.get("/class-user-of-class", userShareClassController.getClassInfoAndUserOfClass);
router.get("/class-tutor-by-idUser", userShareClassController.getClassInfoAndTutorByIdUser);
router.get("/search-notification", userShareClassController.searchClassUser);
module.exports = router;