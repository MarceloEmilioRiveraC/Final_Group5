import { Router } from 'express'
import * as postController from '../controllers/postController'
import { authenticateToken, authorizeRole } from '../middleware/auth'

const router = Router()

// Public routes
router.get('/', postController.getAll)

// Protected routes (any authenticated user)
router.post('/', authenticateToken, postController.create)
router.patch('/:id/like', authenticateToken, postController.like)
router.patch('/:id/share', authenticateToken, postController.share)
router.patch('/:id/buy', authenticateToken, postController.bought)

// Admin only routes
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['admin']),
  postController.remove
)

export default router