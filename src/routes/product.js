import { Router } from "express";
import { list } from "../controllers/product";
import { checkAuth } from "../middleware/checkAuth";


const router = new Router();

router.get("/products",checkAuth,list);

export default router;