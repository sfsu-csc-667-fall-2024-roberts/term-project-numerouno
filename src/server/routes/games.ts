import express, { response } from "express";
import { Games } from "../db";
import sockets from "../config/sockets";

const router = express.Router();

router.post("/create", async (request, response) => {
    // @ts-expect-error TODO update session to include user_id
    const { id: user_id } = request.session.user;
    const game = await Games.create(user_id);
    request.app.get("io").emit("game-created", game);
    response.redirect(`/games/${game.id}`);
});

router.post("/join/:gameId", async (request, response) => {
    // @ts-expect-error TODO update session to include user id
    const { id: user_id, username, email, gravatar } = request.session.user;
    const { gameId } = request.params;

    // Validate:
    // - Check to make sure user is not already in this game
    // - Check to make sure game is not full
    // - Check to make sure password is correct if required

    const { count } = await Games.getPlayerCount(parseInt(gameId, 10));
    const playerCount = parseInt(count, 10);
    if (playerCount === 4) {
        response.redirect("/lobby");
        return;
    }
    const game = await Games.join(user_id, parseInt(gameId, 10));


    if (playerCount === 3) {
        request.app.get("io").to(`game-${gameId}`).emit("game-starting", game);

        response.redirect(`/games/${gameId}`);
    } else {
        response.redirect(`/games/${gameId}/lobby`);
        request.app
            .get("io")
            .to(`game-${gameId}`)
            .emit("player-joined", { username, email, gravatar });
    }
});

router.get("/:gameId", (request, response) => {
    const { gameId } = request.params;

    response.render("games/game", { title: `Game ${gameId}`, gameId });
});

router.get("/:gameId/lobby", (request, response) => {
    const { gameId } = request.params;
    response.render("games/game-lobby", { title: "Game lobby", gameId });
});

export default router;