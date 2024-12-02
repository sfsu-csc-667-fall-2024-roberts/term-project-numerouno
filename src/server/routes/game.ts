import express from "express";

const router = express.Router();

router.get("/:gameId", (request, response) => {
  const { gameId } = request.params;

  response.render("games/game", { title: `Game ${gameId}`, gameId });
});


export default router;