import mongoose from "mongoose";
try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Conectado a la BD");
} catch (error) {
  console.log("Problema de conexion a BD", error);
}
