const jwt = require("../utils/jwt");

// Protege rutas: exige el header "Authorization: Bearer <token>"
function asureAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(403).send({ msg: "La petición no tiene la cabecera de autenticación" });
  }

  const token = header.replace("Bearer ", "");
  try {
    req.user = jwt.decoded(token);
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Token inválido o vencido" });
  }
}

module.exports = { asureAuth };
