import mongoose from "mongoose";

const mongConnect = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/chat-app');
}

mongConnect();