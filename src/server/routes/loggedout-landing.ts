import express from "express";

const router = express.Router();
router.get("/", (_request, response) => {
    response.render("main-lobby", { title: "NumeroUNO's site" });
});

export default router;