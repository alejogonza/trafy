import routerx from 'express-promise-router';
import verifyToken from "../../middlewares/tokenVerify"
import registerController from './register/registerController'
import loginController from './login/loginController'
import trafficController from './traffic/trafficController'
import userDataController from './userData/userDataController'



const router=routerx();
//login
router.post('/login',loginController.login);
//register
router.post('/register',registerController.register);
router.post('/placa-validate',registerController.placaValidate);

//traffic
router.post('/traffic',verifyToken,trafficController.trafficLight);
//user
router.post('/user',verifyToken,userDataController.userData);

export default router;