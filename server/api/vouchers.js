const router = require('express').Router();
let voucherModel = require('../mongodb/models/vouchers');


router.route('/voucher/add')
.post(function(req,res){
    let voucher = new voucherModel;
   
    voucher.title = req.body.title;
    voucher.description = req.body.description;
    voucher.expiry_date = req.body.expiryDate;
    voucher.img_file_name = req.body.imageFileName;    
    voucher.amount = req.body.amount;
    voucher.payment_method = req.body.paymentMethods;
    voucher.payment_discount = req.body.paymentDiscount;
    voucher.quantity = req.body.quantity;
    voucher.buy_type = req.body.buyType;
    voucher.buy_limit = req.body.buyLimit;
    voucher.buy_limit_for_others = req.body.buyLimitForOthers;
    voucher.is_active = req.body.isActive;
    voucher.create_date = req.body.createDate;

    voucher.save(function(err){
        if(err) res.send(err)

        res.json({message: 'Successfully saved!'});
    })
});

router.route('/voucher/list')
.get(function(req, res){
    voucherModel.find({}, function(err, list){
        if (err) res.send(err)

        res.json(list);
    })
});

router.route('/voucher/active/list')
.get(function(req, res){
    voucherModel.find({is_active: true}, function(err, list){
        if (err) res.send(err)

        res.json(list);
    })
});

router.route('/voucher/detail')
.post(function(req, res){
    console.log("Voucher Id", req.body)
    voucherModel.findById(req.body.voucherId, function(err, detail){
        if (err) res.send(err)

        res.json(detail);
    })
});

router.route('/voucher/activate')
.put(function(req, res){  
    voucherModel.findById(req.body.voucherId, function(err, voucher){
        if (err) res.send(err)

        voucher.is_active = req.body.isActive;
        voucher.save(function(err){
            if (err) res.send(err);

            res.json({message: 'Successfully Updated.'})
        })


    })
})

module.exports = router;