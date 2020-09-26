const router = require("express").Router();
let userModel = require("../mongodb/models/users");
let hashPassword = require("../mongodb/hashPassword");
let jwt = require("../jwtService");



router.route('/auth')
.post(function(req, res){
    userModel.findOne({email: req.body.email}, function(err, user){
        if (err) res.send(err);
        // console.log("User Email", req.body.email);
        // console.log("User", user)
        if (user !== null){            
           
            let hashPwd = new hashPassword();
            let comparePwd = hashPwd.validPassword(req.body.password, user.password);
            if(comparePwd){
                // console.log("Auth Response", user);
                let payload = {
                    name: `${user.FirstName} ${user.LastName}`,
                    email: user.email,
                    type: user.userType
                }
                let Options = {
                    issuer: 'Aung Myo Hlaing',
                    subject: 'amhlaing@gmail.com',
                    audience: user.FirstName + " " + user.LastName
                }
                let token = jwt.sign(payload, Options);
                const userInfo = {
                    name: `${user.FirstName} ${user.LastName}`,
                    email: user.email,
                    type: user.userType,
                    token: token
                }
               
                res.send(userInfo);
            } else res.json(null) 
            
        } else {
            res.json(null);
        }

        
    })
})

module.exports = router;