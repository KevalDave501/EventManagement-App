const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/createAdmin', adminController.createAdmin);
router.get('/loginAdmin', adminController.loginAdmin);
router.get('/getAllUsers', authenticateToken , adminController.getAllUser);

module.exports = router;