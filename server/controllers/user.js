const User = require("../models/user");

// GET /api/v1/user/me  (requiere token)
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.user_id).select("-password");
    if (!user) return res.status(404).send({ msg: "Usuario no encontrado" });
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = { getMe };
