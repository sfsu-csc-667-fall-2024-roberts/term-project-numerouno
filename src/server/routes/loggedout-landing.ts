import express from "express";

const router = express.Router();
router.get("/", (_request, response) => {
    response.render("loggedout-landing", { title: "NumeroUNO's site" });
});

export default router;