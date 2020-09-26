const router = require('express').Router();
let userModel = require('../mongodb/models/users');
let hashPassword = require('../mongodb/hashPassword');

router.route('/user')
.get(function(req, res){
    userModel.find({}, function(err, user){
        if(err) res.send(err);

        res.json(user);
    })
});

router.route('/user/bystore')
.post(function(req, res){
    userModel.findOne({storeId: req.body.storeId}, function(err, data){
        if(err) res.send(err);

        res.json(data);
    })
});

router.route('/user/byemail')
.post(function(req, res){
    userModel.findOne({userEmail: req.body.email}, function(err, data){
        if(err) res.send(err);

        res.json(data);
    })
});

router.route('/user/add')
.post(function(req, res){
    let user = new userModel;
    let hashPwd = new hashPassword();

    user.storeId = req.body.storeId;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = hashPwd.generateHash(req.body.password);
    user.confirmPassword = hashPwd.generateHash(req.body.confirmPassword);
    user.userType = req.body.userType;
    user.isActivated = req.body.isActivated;
    user.createDate = req.body.createDate;

    user.save(function(err){
        if(err) res.send(err);

        res.json({message: 'Successfully saved!'});
    })
})

module.exports = router;