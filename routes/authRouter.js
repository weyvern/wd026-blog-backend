import { Router } from 'express';
import { getUser, loginUser, registerUser } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/signup', registerUser);
authRouter.post('/signin', loginUser);
authRouter.get('/me', getUser);

export default authRouter;
