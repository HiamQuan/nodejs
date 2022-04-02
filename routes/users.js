import { Router } from 'express';
import { signin,signup} from '../controller/auth';
import { checkAuth } from '../middlewares/checkAuth'; 
const router = Router();

// resful API

router.post('/signup', checkAuth, signup);
router.post('/signin', checkAuth, signin);


export default router;