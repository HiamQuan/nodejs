import { Router } from 'express';
import { create, list, read, remove, search, update } from '../controller/user';
import { checkAuth, isAdmin } from '../middlewares/checkAuth' 

const router = Router();

// resful API
router.get('/users', checkAuth, list);
router.get('/user/:id', checkAuth, read);
router.post('/users',checkAuth,isAdmin,create);
router.delete('/user/:id', checkAuth,isAdmin, remove);
router.patch("/user/:id", checkAuth, update );
router.get("/search", checkAuth, search );


export default router;