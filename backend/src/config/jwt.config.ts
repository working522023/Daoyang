import fs from 'fs';
import { Algorithm, VerifyOptions } from 'jsonwebtoken';
import path from 'path';

export const JWT_CONFIG = {
    privateKey: fs.readFileSync(path.join(__dirname, '..', 'keys', 'private.pem'), 'utf8'),
    publicKey: fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.pem'), 'utf8'),
    signOptions: {
        algorithm: 'RS256' as const,
        expiresIn: '8h',
    },
    verifyOptions: {
        algorithms: ['RS256'] as Algorithm[],
    } as VerifyOptions,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 60 * 60 * 1000,
    },
    clearCookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
    },
};
