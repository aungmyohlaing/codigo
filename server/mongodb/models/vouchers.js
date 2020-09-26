let mongoose = require('mongoose');

let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let VoucherSchema = new Schema({
    voucherId: ObjectId,
    title: String,
    description: String,
    expiry_date: Date,
    img_file_name: String,
    amount: Number,
    payment_method: String,
    payment_discount: String,
    quantity: Number,
    buy_type: String,
    buy_limit: Number,
    buy_limit_for_others: Number,
    is_active: Boolean,
    create_date: Date
});

let Voucher = mongoose.model('Voucher', VoucherSchema);
module.exports = Voucher;