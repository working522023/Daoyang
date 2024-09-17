import { logger } from '@/config';
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const start = Date.now();

    logger.info(`Incoming request: ${method} ${url}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`Request completed: ${method} ${url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};
