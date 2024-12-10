import express from "express";
import { Games } from "../db";

const router = express.Router();
router.get("/", async (_request, response) => {
    const availableGames = await Games.availableGames();

    response.render("main-lobby", { title: "Lobby Main Page", availableGames });
});

export default router;