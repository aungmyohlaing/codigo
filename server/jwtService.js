const fs = require("fs");
const jwt = require("jsonwebtoken");

let privateKEY = fs.readFileSync("./private.key", "utf-8");
let publicKEY = fs.readFileSync("./public.key", "utf-8");

module.exports = {
  sign: (payload, $Options) => {
    // Token signing options
    let signOptions = {
      issuer: $Options.issuer,
      subject: $Options.subject,
      audience: $Options.audience,
      expiresIn: "1d", // 1 day validity
      algorithm: "RS256",
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: (token, $Option) => {
    let verifyOptions = {
      issuer: $Option.issuer,
      subject: $Option.subject,
      audience: $Option.audience,
      expiresIn: "1d",
      algorithm: ["RS256"],
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
};
