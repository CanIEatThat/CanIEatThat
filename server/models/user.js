const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String
});

//compare password with the value in the database
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

//Loopback
UserSchema.pre('save', function saveHook(next) {
    const user = this;
    //if user is changed or doesn't exist
    if(!user.isModified('password')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }
            //replace pass with hash value
            user.password = hash;
            return next;
        });
    });
});

module.exports = mongoose.model('User', UserSchema);