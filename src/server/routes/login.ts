import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("auth/login", { messages: {error:"invalid username or password"}, title: "Login Page" });
});

export default router;