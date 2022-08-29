import { body } from "express-validator";
export const validationBodyExpress = () => {
  return [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  ];
};
