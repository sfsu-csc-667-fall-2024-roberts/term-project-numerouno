import connectPgSimple from "connect-pg-simple";
import type { Express, RequestHandler } from "express";
import flash from "express-flash";
import session from "express-session";


let sessionMiddleware: RequestHandler | undefined = undefined;

export default (app: Express): RequestHandler => {
    if (sessionMiddleware === undefined) {
        const sessionSecret = process.env.SESSION_SECRET;
        if (!sessionSecret) {
            throw new Error("SESSION_SECRET environment variable is not defined.");
        }
        sessionMiddleware = session({
            store: new (connectPgSimple(session))({
                createTableIfMissing: true,
            }),
            secret: sessionSecret,
            resave: true,
            saveUninitialized: true,
        });

        app.use(sessionMiddleware);
        app.use(flash());
    }

    return sessionMiddleware;
};