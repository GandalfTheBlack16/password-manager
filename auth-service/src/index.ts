import express, { Express, json, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from '@password-manager/commons';
import { signup } from './services/signup-service.js';
import UserCreationResult from './models/messages/user-creation-result.js';
import { connect } from 'mongoose';

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
        const result: UserCreationResult = await signup({username, password});
        res.json({ result });
});

app.listen(PORT as number, async () => {
    await connect(MONGO_URI);
    logger.info(`Authentication service running on port ${PORT}`);
});