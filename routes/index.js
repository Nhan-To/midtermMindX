import { authRouter } from './publicRouter.js';
import { userRouter } from './userRouter.js';

const routes = [
    {
        path: "/users",
        router: userRouter,
    },
    {
        path: "/auth",
        router: authRouter
    }
]

const routesFn = (app) => {

    routes.forEach((route) => {
        if (route.path === "/auth") {
            app.use(route.path, route.router);
        }
        else if (route.path === "/users") {
            app.use(route.path, route.router);
        }
    });
}

export default routesFn;