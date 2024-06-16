const express = require('express');
const router = express.Router();
const useController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/createUser', useController.createUser);
router.post('/login', useController.login);
router.post('/forgotPassword', useController.forgotPassword);
router.post('/resetPassword', useController.resetPassword); 

module.exports = router;