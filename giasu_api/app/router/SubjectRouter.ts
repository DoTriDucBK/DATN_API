import SubjectController from '../controller/SubjectController'
const express = require('express')
const router = express.Router()
let subjectController = new SubjectController()
router.get("/abc", subjectController.getAll);
router.get('/get-subject-id', subjectController.getSubjectById);
router.get('/get-subject-name', subjectController.getSubjectByName);
module.exports=router