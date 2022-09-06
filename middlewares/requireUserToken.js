import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("No Bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error.message);
    const tokenVerifcationError = {
      ["invalid signature"]: "La firma del JWT no es valida",
      ["jwt expired"]: "JWT expirado",
      ["invalid token"]: "Token no valido",
      ["No Bearer"]: "Utilizia formato bearer",
      ["jwt malformed"]: "JWT formato no válido",
    };
    return res
      .status(401)
      .send({ error: tokenVerifcationError[error.message] });
  }
};
