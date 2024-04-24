import mongoose from "mongoose";
import { BoardSchema } from "./WorkSchema";
// user.ts
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true },
   authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false }
   },
   boards: [BoardSchema]
});

// Create a Mongoose model
export const UserModel = mongoose.model("Users", UserSchema);

