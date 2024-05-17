const express = require('express');

const checkAuth = require('../middleware/check-auth');
const filesController = require('../controller/files');
const router = express.Router();

// checkAuth
router.post("",filesController.addFile);

router.delete("", filesController.deleteFile);

router.get("/:id", filesController.getAllFilesForProject);

// router.delete("/:id", filesController.deleteProject);


module.exports = router;