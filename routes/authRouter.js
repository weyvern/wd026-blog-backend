import { Router } from 'express';
import { getUser, loginUser, registerUser } from '../controllers/auth.js';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { siginSchema, userSchema } from '../joi/schemas.js';

const authRouter = Router();

authRouter.post('/signup', validateJOI(userSchema), registerUser);
authRouter.post('/signin', validateJOI(siginSchema), loginUser);
authRouter.get('/me', verifyToken, getUser);

export default authRouter;
