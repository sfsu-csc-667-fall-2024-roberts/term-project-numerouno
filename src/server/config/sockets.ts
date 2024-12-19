import { Server } from "http";
import { Express, RequestHandler } from "express";
import { Server as SocketIoServer, Socket } from "socket.io";
import { Session } from "express-session";

interface CustomSession extends Session {
    user?: {

        id?: string;
    };
    roomId?: string;
}

interface CustomSocketRequest extends Request {
    session: CustomSession;
}

let io: SocketIoServer | undefined;

const bindSession = async (socket: Socket) => {
    const request = socket.request as unknown as CustomSocketRequest;;

    if (!request.session) {
        console.error("Session is undefined");
        socket.disconnect();
        return;
    }

    const userId = request.session?.user?.id; // Safely access user.id if session and session.user exist
    const roomId = request.session?.roomId;


    socket.join(`user-${userId}`);
    socket.join(`chat-${roomId}`);
    socket.join(`game-${roomId}`);


    socket.use((_, next) => {
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

        io.on("connection", async (socket) => {
            await bindSession(socket);
            const request = socket.request as unknown as CustomSocketRequest;
            console.log(`client connected (${request.session?.id})`);

            socket.on("disconnect", () => {
                console.log(`client disconnected (${request.session.id})`);
            });
        });
    }

    return io;
}