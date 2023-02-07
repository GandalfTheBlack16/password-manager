import express, { Express, json, Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import cors from 'cors';
import { logger } from '@password-manager/commons';
import UserCreationResponse from './models/responses/user-creation-response.js';
import mongoose from 'mongoose';
import UserAuthenticatedResponse from './models/responses/user-authenticated-response.js';
import { AuthStatusEnum } from './models/responses/auth-status-enum.js';
import config from 'config';
import { signup, login, usernameExists } from './services/auth-service.js';

const MONGO_URI = process.env.MONGODB ?? config.get('dbConfig.uri');
const PORT = process.env.PORT ?? config.get('appConfig.port') as number;

const app: Express = express();
app.use(cors());
app.use(json());

app.get(
  '/health',
  async (req: Request, res: Response) => {
    const dbState: number = mongoose.connection.readyState;
    switch(dbState){
      case 1:
        return res.status(200).json({ status: 'UP' })
      case 2:
        return res.status(503).json({ status: 'STARTING' });
      default:
        return res.status(503).json({ status: 'DOWN' });
    }
});

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
        if (result.status === AuthStatusEnum.ERROR){
          if (result.message.includes('already exists'))
            res.status(409);
          else
            res.status(500)
        }
        res.status(201).json({ result });
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
      res.status(401);
    }
    res.json({ result });
});

app.get(
  '/available',
  query('username').isEmail(),
  async (req: Request, res: Response) => {
    const { username } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const available = !await usernameExists(username as string);
    res.json({
      username,
      available
    })
});

app.listen(PORT as number, async () => {
    await mongoose.connect(MONGO_URI);
    logger.info(`Authentication service running on port ${PORT}`);
});