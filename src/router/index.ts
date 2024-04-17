import express from 'express';
import authRouter from './authRouter';
// import { register } from '../controllers/authControllers';
import userRouter from './userRouter';
import todoRouter from './todoRouter';

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    userRouter(router);
    todoRouter(router);
    return router;
};
// router.post('/auth/register',register);
// const userRoutes = router
// export default userRoutes