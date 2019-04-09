import TutorController from '../controller/TutorController';
const express = require("express");
const router = express.Router();
let tutorController = new TutorController();
router.get("/", tutorController.getAll);
router.get("/tutor-id",tutorController.getTutorById);
router.get("/tutor-subject", tutorController.getTutorBySubject);
router.get("/search-tutor", tutorController.searchTutor);
router.post("/", tutorController.createTutor);
router.get("/tutor-name", tutorController.getTutorByName);
router.post('/edit-tutor', tutorController.editTutor)
module.exports = router;