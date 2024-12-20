import { NextFunction, Request, Response } from "express";
import { Games } from "../../db";

export const broadcastGameUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const gameId = parseInt(request.params.gameId, 10);

    const playerData = await Games.getPlayers(gameId);

    const socket = request.app.get("io");

    for (let index = 0; index < playerData.length; index++) {
        const player = playerData[index];
        const tCard = await Games.getTopCard(gameId);
        socket.to(`user-${player.id}`).emit(`game:${gameId}:updated`, {
            players: playerData.filter((p: { id: any; }) => p.id !== player.id),
            player: {
                ...playerData.find((p: { id: any; }) => p.id === player.id),
                hand: await Games.getPlayerHand(gameId, player.id),
                topCard: tCard,
            },
        });
    }

    next();
}