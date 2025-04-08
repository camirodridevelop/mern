const User = require("../models/user")

//logica para obtener datos usuario...
async function getMe(req, res) {

  //recibir payload para mantener sesion

  const { user_id } = req.user;

   const user = await User.findById(user_id);
    
   if(!user){
      res.status(400).send({ msg:"No se ha encontrado usuario"});
   } else {
      res.status(200).send(user);
   }

  }

module.exports = {
    getMe,
};

