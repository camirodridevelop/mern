const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

// POST /api/v1/auth/register
async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password || password.length < 6) {
      return res.status(400).send({ msg: "La contraseña debe tener al menos 6 caracteres" });
    }

    const emailLower = email.toLowerCase().trim();
    const exists = await User.findOne({ email: emailLower });
    if (exists) return res.status(409).send({ msg: "Ya existe un usuario con ese email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email: emailLower,
      password: hashedPassword,
      role: "user",
      active: true,
    });
    await user.save();

    return res.status(201).send({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

// POST /api/v1/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "El email y la contraseña son obligatorios" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // Mismo mensaje si el email no existe o la contraseña es incorrecta,
    // para no revelar qué emails están registrados.
    const validPassword = user ? await bcrypt.compare(password, user.password) : false;
    if (!validPassword) return res.status(401).send({ msg: "Email o contraseña incorrectos" });

    if (!user.active) return res.status(401).send({ msg: "Usuario desactivado" });

    return res.status(200).send({ access_token: jwt.createAccessToken(user) });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = { register, login };
