import express from "express";
import { deleteUserByid, getUser, updateUSerByid, getUserByid, addBoardToUser, getUserWithBoards } from '../helpers/userHelper';
import { rmSync } from "fs";
import { createBoard, getBoards } from '../helpers/workHelper';


export const getUserWithAllBoards = async (req: express.Request , res: express.Response) => {
    try {
        const userId = req.query.userId as string; // Type assertion

        // Check if userId is a valid string
        if (!userId) {
            return res.status(400).json({ message: 'Invalid userId' });
        }
        const getBoardsWithUser = await getUserByid(userId)
        res.status(200).json(getBoardsWithUser)
    } catch (error) {
        res.status(500).json({ error})
    }
};

export const getUserById = async (req: express.Request , res: express.Response) => {
    try {
        const userId = req.query.userId as string;
        console.log(userId);
        
        const userById = await getUserByid(userId)
        // console.log(userById);
        
        res.status(200).json(userById)
    } catch (error) {
        res.status(500).json({ error : error})
    }
}
export const createBoardToUser =  async (req: express.Request, res: express.Response) => {
    try {
        const { userId , boardId} = req.query;
        
        const updatedUser = await addBoardToUser(`${userId}` , `${boardId}`);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}
export const getAllUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUser();
        return res.status(200).json(user); 
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {

    try {

        const {id} = req.params;

        const deletedUser = await deleteUserByid(id);

        return res.status(204).json(deletedUser);
        
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {

    try {
        
        const {id} = req.params;
        const {username} = req.body;

        if(!username){
            return res.status(400).json('enter user name')
        }

        const user =  await getUserByid(id);
        if (!user) {
            return res.status(404).json('User not found');
        }
    
        if (user.username !== undefined) {
            user.username = username; 
        }
    
        await user.save();

        const updatedUser = await updateUSerByid(id,{});

        return res.status(200).json(updatedUser).end()
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
}