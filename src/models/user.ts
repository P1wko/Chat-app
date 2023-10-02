import mongoose, {Document, Model} from "mongoose";

interface IUser extends Document {
    login: string,
    password: string
}

interface IUserModel extends Model<IUser> {
    findByCredentials(login: string, password:string): Promise<IUser>;
}

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
})

userSchema.statics.findByCredentials = async (login: string, password:string) => {
    const user = await User.findOne({login: login});
    if(!user) { 
        throw new Error('Unable to login');
    }
    if(user.password !== password) {
        throw new Error('Unable to login');
    }
    return user;
}

userSchema.methods.auth = async function() {
    //token
}

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);