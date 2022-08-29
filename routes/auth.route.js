import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { validationBodyExpress } from "../middlewares/validationBodyExpress.js";
//las autenticaciones estan en este router
const router = express.Router();
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

export default router;
