import ClassInfoController from '../controller/ClassInfoController';
const express = require("express");
const router = express.Router();
let classInfoController = new ClassInfoController();
router.get("/", classInfoController.getAll);
router.get("/class-sub",classInfoController.getClassBySubject);
router.get("/search-class", classInfoController.searchClass);
router.post("/", classInfoController.createClassInfo);
router.get("/class-id",classInfoController.getClassByIdUser);

module.exports = router;