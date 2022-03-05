const express = require('express');

const usersController = require('../controllers/auth.controller');
const middleware = require('../utils/middleware');

const router = express.Router();

router.get('/all', middleware, usersController.getAllUsers);

router.post('/setRole', middleware, usersController.setRole);

router.get('/me', middleware, usersController.getUser);

router.post('/generateOtp', usersController.generateOtp);

router.post('/verifyOtp', usersController.verifyOtp);

module.exports = router;