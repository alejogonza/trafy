import routerx from 'express-promise-router';
import userCheckout from '../controllers/user/route';

const router=routerx();

router.use('/user', userCheckout);


export default router;