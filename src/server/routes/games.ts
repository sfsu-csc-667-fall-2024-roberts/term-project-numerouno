import express, { response } from "express";
import { Games } from "../db";
import sockets from "../config/sockets";
import { broadcastGameUpdate, canPlayerDraw, isPlayersTurn } from "./game-middleware";

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
    const { id: userId, username: username } = request.session.user;
    const { gameId } = request.params;

    // Validate:
    // - Check to make sure user is not already in this game

    const { count } = await Games.getPlayerCount(parseInt(gameId, 10));
    const playerCount = parseInt(count, 10);
    if (playerCount === 4) {
        response.redirect("/lobby");
        return;
    }


    const game = await Games.join(userId, parseInt(gameId, 10));


    // if (playerCount === 3) {
    //     request.app.get("io").to(`game-${gameId}`).emit("game-starting", game);

    //     response.redirect(`/games/${gameId}`);
    // } else {
    //     response.redirect(`/games/${gameId}/lobby`);
    //     request.app
    //         .get("io")
    //         .to(`game-${gameId}`)
    //         .emit("player-joined", { username });
    // }
    next();
},
    broadcastGameUpdate,
    (request, response) => {
        const gameId = parseInt(request.params.gameId, 10);

        response.redirect(`/games/${gameId}`);
    },

);

router.post(
    "/:gameId/draw",
    isPlayersTurn,
    canPlayerDraw,
    async (request, _response, next) => {
        console.log("hi");
        const gameId = parseInt(request.params.gameId, 10);
        const userId = (request.session as any).user?.id;
        await Games.drawCard(gameId, userId);

        // next();
    },
    // broadcastGameUpdate,
    // (_request, response) => {
    //     response.sendStatus(200);
    // },

);

router.get("/:gameId/update", broadcastGameUpdate, (_request, response) => {
    response.sendStatus(200);
});

// router.get("/:gameId", (request, response) => {
//     const { gameId } = request.params;

//     response.render("games/game", { title: `Game ${gameId}`, gameId });
// });

router.get("/:gameId/lobby", (request, response) => {
    const { gameId } = request.params;
    response.render("games/game-lobby", { title: "Game lobby", gameId });
});


function next() {
    throw new Error("Function not implemented.");
}

router.get("/:gameId", async (request, response) => {
    const { gameId } = request.params;

    try {
        const cards = await Games.getRandomCard();
        console.log("Card being passed to EJS:", cards); // Debug output
        response.render("games/game", {
            title: `Game ${gameId}`,
            gameId,
            cards,
        });
    } catch (err) {
        console.error(err);
        response.status(500).send("Error loading game or card data");
    }
});

export default router;
