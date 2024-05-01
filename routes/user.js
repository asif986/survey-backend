const express = require('express');

const router = express.Router();

const UserController = require('../controller/user');

router.post('/signup', UserController.createNewUser);

router.post('/login', UserController.loin)

router.get('/:id', UserController.getUserInformation)


module.exports = router;
