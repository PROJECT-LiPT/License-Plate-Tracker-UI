import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        maxlength: 8
    },
    passWord: {
        type: String,
        require: true,
        maxlength: 12
    },
    imgUrl: String,
    gender: String,
    fullName: String,
    email: {
        type: String,
        default: '',
        unique: true
    },
    address: String,
    phoneNumber: String,
    birthDate: String,
    // array of tracked license plate
    lpList: Array,
    isLogin: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    question_1: String
});

var User = mongoose.model('User', userSchema);

export default User;