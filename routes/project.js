const express = require('express');

const checkAuth = require('../middleware/check-auth');
const ProjectController = require('../controller/project');
const router = express.Router();

// checkAuth
router.post("",ProjectController.createProject);

router.get("/district", ProjectController.getDistrict);

router.get("/components", ProjectController.getComponents);

router.get("/taluka/:id", ProjectController.getTalukaByDistrictId);

router.get("/:id", ProjectController.getProjectsByUserId);

router.get("/completedProject/:id", ProjectController.getCompletedProjectsById);

router.delete("/:id", ProjectController.deleteProject);



module.exports = router;
