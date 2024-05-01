const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    // unique is an optimize features provided by mongoose/mongodb. Is a validation like unique value that the imp.
    user_name:{ type: String, valid: true},
    address:{ type: String, valid: true},
    mobile:{ type: Number, valid: true},
    email: { type: String, valid: true },
    organzation_name:{ type: String, valid: true},
    designation:{ type: String, valid: true},
    user_id:{ type: String, valid: true ,unique: true},
    password: { type: String, valid: true },
    is_active: { type: Boolean,default: true }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
