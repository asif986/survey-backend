const express = require('express');

const checkAuth = require('../middleware/check-auth');
const SurveyController = require('../controller/surveyStore');
const router = express.Router();

// checkAuth
router.post("",SurveyController.createSurveyStore);

// router.get("/:id", SurveyController.getProjectsById);

module.exports = router;
