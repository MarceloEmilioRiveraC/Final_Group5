import express from 'express'
import * as userController from '../controllers/userController'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

// Public routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/refresh-token', userController.refreshToken)

// Protected routes
router.get(
  '/profile',
  authenticateToken,
  userController.getProfile
)

router.post('/logout', authenticateToken, userController.logout)

export default router