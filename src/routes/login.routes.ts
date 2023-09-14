import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares/user.middlewares';

const LoginRouter = express.Router();

LoginRouter.post('/', middlewares.validateLoginFields, controllers.userLogin);

export default LoginRouter;
