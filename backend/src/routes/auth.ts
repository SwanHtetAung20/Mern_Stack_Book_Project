import express from "express";

import { register, login, handleRefreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/refresh-token", handleRefreshToken);

export default router;
