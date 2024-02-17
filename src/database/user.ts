import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, reqiuired: true },
    authentication: {
        password: { type: String, requird: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});

// Create a Mongoose model

export const UserModel = mongoose.model("Users", UserSchema);

