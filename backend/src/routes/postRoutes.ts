import { Router } from 'express'
import * as postController from '../controllers/postController'

const router = Router()

router.get('/',           postController.getAll)
router.post('/',          postController.create)
router.delete('/:id',     postController.remove)
router.patch('/:id/like', postController.like)

export default router