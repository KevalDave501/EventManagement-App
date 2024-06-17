const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/createAdmin', adminController.createAdmin);
router.post('/loginAdmin', adminController.loginAdmin);
router.get('/getAllUsers', authenticateToken, adminController.getAllUser);
router.put('/updateUserIsActive/:id', authenticateToken, adminController.updateUserIsActive);
router.post('/createEvent',authenticateToken, adminController.createEvent);
router.get('/events', adminController.getAllEvents);

module.exports = router;