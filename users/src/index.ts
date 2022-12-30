import express, { Express } from 'express';
import { logger } from '@password-manager/commons';

const PORT = process.env.PORT ?? 3000;

const app: Express = express();

app.listen(PORT as number, () => {
    logger.info(`User service running on port ${PORT}`);
});