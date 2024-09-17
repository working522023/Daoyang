import { Request, Response, NextFunction } from 'express';
import { CustomException } from '../exceptions';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomException) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    } else {
        console.error('Unexpected error:', err);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};
