import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/user-controller.js";
import requireTurnstile from '../middleware/turnstile.middleware.js';

const router = Router();

router.post("/register", requireTurnstile, registerUser);
router.post("/login", requireTurnstile, loginUser);

export default router;
