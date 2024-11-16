import express from "express";

const router = express.Router();


router.get("/", (_request, response) => {
  response.render("auth/register", { title: "Register Page" });
});

export default router;