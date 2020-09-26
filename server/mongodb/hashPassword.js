var bcrypt = require('bcrypt-nodejs');

class hashPassword {
    //hash the password
    generateHash(pwd){
        return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
    }
    //get hash value password
    getHash(pwd){
        return bcrypt.hashSync(pwd);
    }
    //checking valid password
    validPassword(pwd, hashPwd){
        return bcrypt.compareSync(pwd, hashPwd);
    }
}

module.exports = hashPassword;