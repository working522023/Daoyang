import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JwtPayload } from '../interfaces';
import { JWT_CONFIG } from '@/config';

export class JWTService {
    static generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, JWT_CONFIG.privateKey, JWT_CONFIG.signOptions);
    }

    static verifyToken(authToken: string): JwtPayload {
        try {
            const decoded = jwt.verify(authToken, JWT_CONFIG.publicKey, JWT_CONFIG.verifyOptions);

            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'name' in decoded && 'email' in decoded && 'role' in decoded) {
                return decoded as JwtPayload;
            } else {
                throw new Error('Invalid Token Payload');
            }
        } catch (err) {
            throw new Error('Invalid Token');
        }
    }

    static setTokenCookie(res: Response, authToken: string): void {
        res.cookie('auth_token', authToken, JWT_CONFIG.cookieOptions);
    }

    static clearTokenCookie(res: Response): void {
        res.clearCookie('auth_token', JWT_CONFIG.clearCookieOptions);
    }
}
