import express from "express";

const router = express.Router();
router.get("/", (_request, response) => {
    response.render("root", { title: "NumeroUNO's site" });
});

export default router;