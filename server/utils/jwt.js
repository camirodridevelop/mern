const jwt = require("jsonwebtoken");

// El secreto se lee al momento de usarlo (y no al importar el archivo)
// para asegurar que dotenv ya cargó las variables de entorno.
const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Falta la variable de entorno JWT_SECRET");
  return secret;
};

// Genera el token de acceso (dura 24 horas)
function createAccessToken(user) {
  const payload = { user_id: user._id, role: user.role };
  return jwt.sign(payload, getSecret(), { expiresIn: "24h" });
}

// Verifica y decodifica un token. Lanza un error si no es válido o venció.
function decoded(token) {
  return jwt.verify(token, getSecret());
}

module.exports = { createAccessToken, decoded };
