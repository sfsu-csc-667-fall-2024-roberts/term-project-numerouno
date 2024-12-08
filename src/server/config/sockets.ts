import { Server } from "http";
import { Express, RequestHandler } from "express";
import { Server as SocketIoServer, Socket } from "socket.io";


let io: SocketIoServer | undefined;

const bindSession = (socket: Socket) => {
    const { request } = socket;
    // @ts-expect-error TODO figure out the typing for session on request
    socket.join(request.session.id);
    socket.use((_, next) => {
        // @ts-expect-error TODO figure out the typing for session on request
        request.session.reload((error) => {
            if (error) {
                socket.disconnect();
            } else {
                next();
            }
        });
    });
};

export default function (
    server: Server,
    app: Express,
    sessionMiddleware: RequestHandler,
): SocketIoServer {
    if (io === undefined) {

        io = new SocketIoServer(server);

        app.set("io", io);
        io.engine.use(sessionMiddleware);

        io.on("connection", (socket) => {
            bindSession(socket);
            // @ts-expect-error TODO figure out the typing for session on request
            console.log(`client connected (${socket.request.session.id})`);
            socket.on("disconnect", () => {
                // @ts-expect-error TODO figure out the typing for session on request
                console.log(`client disconnected (${socket.request.session.id})`);
            });
        });
    }
    return io;
}