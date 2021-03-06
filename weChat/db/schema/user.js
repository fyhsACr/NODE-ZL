var mongoose = require('../db');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email:    String,
    address:  String,
    imgUrl:String,
    friends:[{type:Schema.Types.ObjectId, ref:'User' }],
    following:[{type:Schema.Types.ObjectId,ref:'User'}],
    followed:[{type:Schema.Types.ObjectId,ref:'User'}],
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    }
});

userSchema.pre('save', function (next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
})

module.exports = mongoose.model('User', userSchema);
