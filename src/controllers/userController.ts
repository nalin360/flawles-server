import express from "express";
import { deleteUserByid, getUser, updateUSerByid, getUserByid } from '../helpers/userHelper';
import { rmSync } from "fs";

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