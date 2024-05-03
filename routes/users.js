import passport from "passport";
import express from "express";

import { getUsers, createUser, loginUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

router.post("/login", passport.authenticate("local"), loginUser);

router.get("/logout", (req,res) => {
  req.logout();
})

export default router;
