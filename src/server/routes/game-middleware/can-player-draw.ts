import { NextFunction, Request, Response } from "express";
import { Games } from "../../db";

export const canPlayerDraw = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {

    // since is-player-turn is run first gameId is assured
    const gameId = parseInt(request.params.gameId, 10);


    // @ts-expect-error TODO: Define the session type for the user object
    const { id: userId } = request.session.user;

    // checking if a card in the player's hand can be used
    const avaliablePlays = await Games.playableCards(gameId, userId);

    const socket = request.app.get("io");
    if (avaliablePlays === 0) {
        next();
    } else {
        response.status(401);

        socket.to(`user-${userId}`).emit(`message:${gameId}`, {
            message: "You have a usable card",
            username: "system",
            gravatar: "123456789?d=robohash",
            timestamp: new Date(),
        });
    }

}