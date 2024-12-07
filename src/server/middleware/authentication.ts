import { NextFunction, Request, Response } from "express";
import { SessionData } from "express-session";

// Extend the SessionData interface to include the user property

const authenticationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    // @ts-expect-error TODO: Define the session type for the user object
    if (!request.session || !request.session.user) {
        response.redirect("/auth/login");
    } else {
        // @ts-expect-error TODO: Define the session type for the user object
        console.log(request.session.user);
        // @ts-expect-error TODO: Define the session type for the user object
        response.locals.user = request.session.user;
        next();
    }
};

export default authenticationMiddleware;