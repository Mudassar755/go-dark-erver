

module.exports = async function(req, res, next) {
  if(req.currentUser.role !=="admin") return res.send("No Access! Authorization denied ")
  next()
};
