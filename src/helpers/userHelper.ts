import { Board } from "../database/WorkSchema";
import { createNewBoards } from "../controllers/todoController";
import { UserModel } from "../database/user";
import { createBoard } from "./workHelper";
import mongoose from "mongoose";

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserByid = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());
export const deleteUserByid = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUSerByid =
    (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);


    export const addBoardToUser = async (userId: string, boardId: string) => {
        // Check if a board with the same boardID already exists
        const existingBoard = await Board.findOne({ boardID: boardId });
        if (existingBoard) {
            throw new Error(`Board with the same boardID already exists: ${existingBoard}`);
        }
    
        // Create a new board
        const newBoard = await createBoard(boardId);
        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        // Associate the new board with the user
        newBoard.createdBy = userIdObjectId;
        await newBoard.save();
    
        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) throw new Error('User not found');
    
        // Add the new board to the user's boards array
        user.boards.push(newBoard);
        await user.save();
    
        return { user, newBoard };
    };
    

export const getUserWithBoards = async (userId: string) => {
    // Find the user by their ID and populate the 'Boards' field
    console.log(userId);
    
    const user = await UserModel.findById(userId)
    // const users = await getUser();
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


