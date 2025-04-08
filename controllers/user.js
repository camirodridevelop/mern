//logica para obtener datos usuario...
async function getMe(req, res) {

  //recibir payload para mantener sesion
  console.log(req.user);
 // const {user_id} = req.user

 // const user = await UserActivation.findById(user_id);
 // console.log(user);
  

  res.status(200).send({ msg:"Todo Okey"})
}

module.exports = {
    getMe,
};

