import express, { Express, json, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from '@password-manager/commons';
import { signup } from './services/signup-service.js';
import UserCreationResponse from './models/responses/user-creation-response.js';
import mongoose from 'mongoose';
import UserAuthenticatedResponse from './models/responses/user-authenticated-response.js';
import { login } from './services/login-service.js';
import { AuthStatusEnum } from './models/responses/auth-status-enum.js';

const MONGO_URI = process.env.MONGODB ?? 'mongodb://127.0.0.1:27017/test';
const PORT = process.env.PORT ?? 3000;

const app: Express = express();
app.use(json());

app.post(
    '/signup',
    body('username').isEmail(),
    body('password').isLength({ min: 6, max: 16 }),
    async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result: UserCreationResponse = await signup({username, password});
        res.json({ result });
});

app.post(
  '/login', 
  body('username').isEmail(),
  body('password').isLength({ min: 6, max: 16 }),
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result: UserAuthenticatedResponse = await login({ username, password });
    if (result.status === AuthStatusEnum.ERROR){
      return res.status(401).json({ result });
    }
    res.json({ result });
});

app.listen(PORT as number, async () => {
    await mongoose.connect(MONGO_URI);
    logger.info(`Authentication service running on port ${PORT}`);
});