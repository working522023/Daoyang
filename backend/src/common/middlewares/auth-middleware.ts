import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../utils';
import { JwtPayload } from '../interfaces';

export interface UserRequest extends Request {
    user?: JwtPayload;
}

export const authenticateJWT = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.auth_token;

    if (!token) {
        res.status(401).json({ status: 401, message: 'Unauthorized access.' });
        return;
    }

    try {
        const decoded = JWTService.verifyToken(token) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof Error) {
            const isTokenExpired = error.name === 'TokenExpiredError';
            const errorMessage = isTokenExpired ? 'Token expired.' : 'Invalid token.';

            res.status(401).json({ status: 401, message: errorMessage });
        } else {
            res.status(500).json({ status: 500, message: 'An unexpected error occurred.' });
        }
    }
}
