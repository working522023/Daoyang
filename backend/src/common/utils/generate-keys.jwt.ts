import fs from 'fs';
import path from 'path';

export const JWT_CONFIG = {
    privateKey: fs.readFileSync(path.join(__dirname, 'keys', 'private.key'), 'utf8'),
    publicKey: fs.readFileSync(path.join(__dirname, 'keys', 'public.key'), 'utf8'),
    signOptions: {
        algorithm: 'RS256' as const,
        expiresIn: '1h',
    },
    verifyOptions: {
        algorithms: ['RS256'] as const,
    },
};
