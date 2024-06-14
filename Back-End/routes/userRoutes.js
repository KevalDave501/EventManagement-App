const express = require('express');
const router = express.Router();
const useController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/createUser', useController.createUser);
router.post('/login', useController.login);

module.exports = router;