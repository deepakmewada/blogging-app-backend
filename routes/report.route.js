const express = require('express');

const router = express.Router();

const reportController = require('./../controllers/reports.controller')

router.get('/all', reportController.getAllReports)

router.get('/view/:id', reportController.getReport)

router.get('/user/:userid', reportController.getUserReports)

router.post('/add', reportController.addReport)

module.exports = router;