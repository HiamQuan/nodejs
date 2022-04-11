import { Router } from 'express';
import { create, list, listByCategoryAndSort, read, remove, search, update } from '../controller/order';
import { checkAuth, isAdmin,isAuth,requireSignin } from '../middlewares/checkAuth' 
import { userById } from '../controller/user';
const router = Router();

// resful API
router.get('/orders', checkAuth, list);
router.get('/order/:id', checkAuth, read);
router.post('/orders/:userId', requireSignin, isAuth, isAdmin,create);
router.delete('/order/:id', checkAuth, remove);
router.patch("/order/:id", checkAuth, update );
router.get("/orders/category=:category", checkAuth, listByCategoryAndSort );
router.get("/search", checkAuth, search );
router.param("userId", userById);
// router.post("/search",checkAuth,search)

export default router;