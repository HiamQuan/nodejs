import { Router } from 'express';
import { create, list, listByCategoryAndSort, read, remove, search, update } from '../controller/products';
import { checkAuth, isAdmin,isAuth,requireSignin } from '../middlewares/checkAuth' 
import { userById } from '../controller/user';
const router = Router();

// resful API
router.get('/products', checkAuth, list);
router.get('/product/:id', checkAuth, read);
router.post('/products/:userId', requireSignin, isAuth, isAdmin,create);
router.delete('/product/:id', checkAuth, remove);
router.patch("/product/:id", checkAuth, update );
router.get("/products/category=:category", checkAuth, listByCategoryAndSort );
router.get("/search", checkAuth, search );
router.param("userId", userById);
// router.post("/search",checkAuth,search)

export default router;