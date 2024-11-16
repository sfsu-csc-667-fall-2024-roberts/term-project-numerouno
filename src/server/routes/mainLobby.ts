import express from "express";

const router = express.Router();
router.get("/", (_request, response) => {
    response.render("games/loggedin-landing", { title: "Lobby Main Page" });
});

export default router;