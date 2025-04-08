const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//crea el token
function createAccessToken (user){
    //fecha de vencimiento-expiracion
    const expToken = new Date();
    expToken.setHours(expToken.getHours()+3);

    //la informacion del usuario
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };

    //crear token 
return jwt.sign(payload, JWT_SECRET_KEY);
};

//obtener los datos del token
function decode(token){
    return jwt.decode(token, JWT_SECRET_KEY, true)
}

module.exports = {
    createAccessToken,
    decode,
};