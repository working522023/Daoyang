import { Request, Response, NextFunction, Application } from 'express';
import { userRoutes } from '@/modules';

// Define the Route interface for type safety
interface Route {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: any;
    action: string;
    middlewares?: any[];
}

// Combine all module routes
const allRoutes: Route[] = [
    ...userRoutes,
];


export const initializeRoutes = (app: Application): void => {
    allRoutes.forEach((route) => {
        const controllerInstance = new route.controller();
        const middlewares = route.middlewares || [];
        app[route.method](`/api/v1${route.route}`, ...middlewares, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await controllerInstance[route.action](req, res, next);

                if (result !== null && result !== undefined) {
                    res.json(result);
                }
            } catch (error) {
                next(error);
            }
        });
    });
};