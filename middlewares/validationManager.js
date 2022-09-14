import axios from "axios";
import { body, param } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const paramsLinkValidator = [
  param("id", "Formato no valido").trim().notEmpty().escape(),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }

        await axios.get(value);
        return value;
      } catch (error) {
        console.log(error);
        throw new Error("not found longlink 404");
      }
    }),
  validationResultExpress,
];

export const validationRegisterExpress = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  body("password", "Contraseñas iguales").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("No coiunciden las contraseñas");
    }
    return value;
  }),
];

export const validationLoginExpress = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
];
