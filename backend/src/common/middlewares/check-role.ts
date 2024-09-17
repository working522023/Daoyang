import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../utils';

interface DecodedToken {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
}

// Middleware to check user role
export const checkRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.auth_token;

        if (!token) {
            return res.status(401).json({ code: 401, message: 'No token provided.' });
        }

        try {
            // Decode the token
            const decodedToken: DecodedToken = JWTService.verifyToken(token) as DecodedToken;

            if (!allowedRoles.includes(decodedToken.role)) {
                return res.status(403).json({ code: 403, message: 'Insufficient permissions.' });
            }

            req.user = decodedToken;
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
    };
};
