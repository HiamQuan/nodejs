import { Router } from 'express';
import { create, list, read, remove, update } from '../controller/posts';
import { checkAuth } from '../middlewares/checkAuth' 
const router = Router();

// resful API
router.get('/posts', checkAuth, list);
router.get('/posts/:id', checkAuth, read);
router.post('/posts', checkAuth, create);
router.delete('/posts/:id', checkAuth, remove);
router.patch("/post/:id", checkAuth, update );

export default router;