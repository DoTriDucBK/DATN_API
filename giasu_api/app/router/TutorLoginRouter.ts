import TutorLoginController from '../controller/TutorLoginController';
const express = require("express");
const router = express.Router();
let tutorLoginController = new TutorLoginController();

router.post('/', tutorLoginController.createTutor);

module.exports = router;