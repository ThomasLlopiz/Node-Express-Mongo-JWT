import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireUserToken.js";
import {
  validationLoginExpress,
  validationRegisterExpress,
} from "../middlewares/validationManager.js";
const router = Router();
router.post(
  "/register",
  validationRegisterExpress,
  validationResultExpress,
  register
);
router.post("/login", validationLoginExpress, validationResultExpress, login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
export default router;
