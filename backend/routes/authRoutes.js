const express = require('express');
const { signup, login, getAllUsers, deleteUser, getCurrentUser } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth
router.post('/signup', signup);
router.post('/login', login);

// Admin routes
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Current user route
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
