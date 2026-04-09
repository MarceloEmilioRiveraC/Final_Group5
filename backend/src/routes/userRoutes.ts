import { Router } from 'express'
import * as userController from '../controllers/userController'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/', userController.getAllUsers)

export default router