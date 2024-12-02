import express from "express";

const router = express.Router();
router.get("/", (_request, response) => {
    response.render("main-lobby", { title: "Lobby Main Page" });
});

export default router;