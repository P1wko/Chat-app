"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    login: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
});
userSchema.statics.findByCredentials = async (login, password) => {
    const user = await exports.User.findOne({ login: login });
    if (!user) {
        throw new Error('Unable to login');
    }
    if (user.password !== password) {
        throw new Error('Unable to login');
    }
    return user;
};
userSchema.methods.auth = async function () {
    //token
};
exports.User = mongoose_1.default.model('User', userSchema);
