import { Router } from 'express';
import { create, list, listByCategoryAndSort, read, remove, search, update } from '../controller/teacher';
import { checkAuth, isAdmin,isAuth,requireSignin } from '../middlewares/checkAuth' 
import { userById } from '../controller/user';
const router = Router();

// resful API
router.get('/teachers', checkAuth, list);
router.get('/teacher/:id', checkAuth, read);
router.post('/teachers/:userId', requireSignin, isAuth, isAdmin,create);
router.delete('/teacher/:id', checkAuth, remove);
router.patch("/teacher/:id", checkAuth, update );
router.get("/teachers/category=:category", checkAuth, listByCategoryAndSort );
router.get("/search", checkAuth, search );
router.param("userId", userById);
// router.post("/search",checkAuth,search)

export default router;