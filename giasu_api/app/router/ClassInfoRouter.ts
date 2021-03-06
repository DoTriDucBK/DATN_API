import ClassInfoController from '../controller/ClassInfoController';
const express = require("express");
const router = express.Router();
let classInfoController = new ClassInfoController();
router.get("/", classInfoController.getAll);
router.get("/search-class", classInfoController.searchClass);
router.post("/", classInfoController.createClassInfo);
router.get("/class-id",classInfoController.getClassByIdUser);
router.get("/class-subject", classInfoController.getClassBySubject);
router.get("/class-idClass", classInfoController.getClassByIdClass);
router.post('/edit-class', classInfoController.editClass)
module.exports = router;