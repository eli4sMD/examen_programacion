const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role:{
        type: Array,
    }

}, {
    versionKey: false,
    timestamps: true
});

UserSchema.methods.toJSON = function() {
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
}


module.exports = model('Users', UserSchema);