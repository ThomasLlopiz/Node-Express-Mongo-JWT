import jwt from "jsonwebtoken";
import { tokenVerifcationError } from "../utils/tokenManager.js";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("No Bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    //console.log(uid);
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ error: tokenVerifcationError[error.message] });
  }
};
