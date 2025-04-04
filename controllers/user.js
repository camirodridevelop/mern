//logica para obtener datos usuario...
async function getMe(req, res) {
  res.status(200).send({ msg:"Todo Okey"})
}





module.exports = {
    getMe,
};