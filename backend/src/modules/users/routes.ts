import { authenticateJWT, generalRateLimit, loginRateLimit, writeOperationRateLimit } from '@/common';
import { UserController } from './controllers';

// Define the Route interface for type safety
interface Route {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof UserController;
    action: keyof UserController;
    middlewares?: any[];
}

// Define the routes
export const userRoutes: Route[] = [
    { method: 'post', route: '/users/login', controller: UserController, action: 'login', middlewares: [loginRateLimit] },
    { method: 'post', route: '/users/signup', controller: UserController, action: 'signup', middlewares: [writeOperationRateLimit] },
    { method: 'post', route: '/users/logout', controller: UserController, action: 'logout' },
    { method: 'get', route: '/users', controller: UserController, action: 'getUsers', middlewares: [authenticateJWT, generalRateLimit] },
    { method: 'get', route: '/users/:id', controller: UserController, action: 'getUser', middlewares: [authenticateJWT, generalRateLimit] },
    { method: 'post', route: '/users', controller: UserController, action: 'createUser', middlewares: [authenticateJWT, writeOperationRateLimit] },
    { method: 'put', route: '/users/:id', controller: UserController, action: 'updateUser', middlewares: [authenticateJWT, writeOperationRateLimit] },
    { method: 'delete', route: '/users/:id', controller: UserController, action: 'deleteUser', middlewares: [authenticateJWT] },
];
