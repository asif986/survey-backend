const express = require('express');

const checkAuth = require('../middleware/check-auth');
const ProjectController = require('../controller/project');
const router = express.Router();

// checkAuth
router.post("",ProjectController.createProject);

router.get("/:id", ProjectController.getProjectsById);
router.get("/completedProject/:id", ProjectController.getCompletedProjectsById);


module.exports = router;
