// Load Express
const express = require('express');
const router = express.Router();

// Load Controler
const userController = require('../api/controllers/users');

// Define Routes
router.post('/register', userController.create);
router.post('/login', userController.login);
//router.get('/list', userController.list);

module.exports = router;