import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../schemas';
import { register, login } from '../controllers/auth.controller';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), register);
authRoutes.post('/login', validate(loginSchema), login);
