import expressRateLimit from 'express-rate-limit';

// Global rate limiting middleware
export const globalRateLimit = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for login routes (more strict)
export const loginRateLimit = expressRateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for general routes
export const generalRateLimit = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for write operations (e.g., POST, PUT, DELETE)
export const writeOperationRateLimit = expressRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    message: 'Too many write operations from this IP, please try again later.',
});

// Rate limiter for role-based rate limit
export const roleBasedRateLimit = (role: string) => {
    return expressRateLimit({
        windowMs: 15 * 60 * 1000,
        max: role === 'admin' ? 200 : 100,
        message: 'Rate limit exceeded',
        standardHeaders: true,
        legacyHeaders: false,
    });
};