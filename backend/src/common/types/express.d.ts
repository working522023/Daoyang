import { JwtPayload } from '../utils';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export { };