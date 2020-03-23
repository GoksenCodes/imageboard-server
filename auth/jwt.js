const jwt = require("jsonwebtoken"); //import jwt library

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m"; //secret keys should not go to githhub
//so that we first set it to be equal to an env variable we could configure in the
//hosting of our server, so it's not exposed to the public.

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}
function toData(token) {
  return jwt.verify(token, secret);
}
module.exports = { toJWT, toData };
