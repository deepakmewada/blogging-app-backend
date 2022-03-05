var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let otpSchema = mongoose.Schema({
    'id': Schema.Types.ObjectId,
    'identifier': {type: String, required: true, index: true},
    'value': {type: String, required: true, index: true},
    'is_verified': {type: Boolean, index: true, default: false},
},{timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});

otpSchema.index({"createdAt": 1 }, { expireAfterSeconds: 60 } );

module.exports = mongoose.model('OTP', otpSchema);