import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("games/game", { title: "Game Page" });
});

export default router;