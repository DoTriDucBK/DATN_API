import TutorController from '../controller/TutorController';
const express = require("express");
const router = express.Router();
let tutorController = new TutorController();
router.get("/", tutorController.getAll);
router.get("/tutor-id",tutorController.getTutorById);
router.get("/tutor-subject", tutorController.getTutorBySubject);
router.post('/', tutorController.createTutor);

module.exports = router;