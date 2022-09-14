import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireUserToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validationManager.js";
const router = Router();
router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
export default router;
