// Load Express
const express = require('express');
const router = express.Router();

// Load Controler
const userController = require('../api/controllers/users');

// Define Routes
router.get('/list', userController.list);

module.exports = router;