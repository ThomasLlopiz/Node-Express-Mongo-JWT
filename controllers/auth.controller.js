import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //alternatva de valdacon 2 (buscando por email)
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    //jwt
    return res.status(201).json({ ok: true });
  } catch (error) {
    //alternatva de valdacon 1
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe usuario" });
    }
    return res.status(500).json({ error: "Eror de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe usuario" });
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Eror de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.uid });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
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

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
