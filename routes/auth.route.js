import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { validationBodyExpress } from "../middlewares/validationBodyExpress.js";
import { requireToken } from "../middlewares/requireUserToken.js";
//las autenticaciones estan en este router
const router = Router();
router.post(
  "/register",
  [
    validationBodyExpress(),
    body("password", "Contraseñas iguales").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coiunciden las contraseñas");
      }
      return value;
    }),
  ],
  validationResultExpress,
  register
);
router.post("/login", validationBodyExpress(), validationResultExpress, login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
export default router;
