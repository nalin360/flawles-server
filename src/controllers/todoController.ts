import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../helpers/todoHelper';
import { updateUSerByid } from 'helpers/userHelper';

export const newTodos = async (req: express.Request, res: express.Response) => {
    try {
        const { content, userId, parentId } = req.body;
        const newTodo = await createTodo(userId, content, parentId);
        console.log(newTodo);
        
        res.status(201).json(newTodo);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getCurrentTodos = async (req: express.Request, res: express.Response) => {

    try {
        const { userId } = req.query;
        const todos = await getTodos(userId as string);
        console.log(todos);
        
        res.json(todos);
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const updateTodos = async (req: express.Request, res: express.Response) => {

    try {
        const { id } = req.params;
        const update = req.body;
        const updatedTodo = await updateTodo(id, update);
        console.log(updateTodo);
        
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const deleteTodos = async (req: express.Request, res: express.Response) => {

    try {
        const { id } = req.params;
        await deleteTodo(id);
        console.log("deleted", id);
        
        res.status(204).end();
    } catch (error) {
        return res.status(400).json(error)
    }

}