const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;