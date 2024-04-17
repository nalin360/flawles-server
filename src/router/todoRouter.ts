import { deleteTodos, getCurrentTodos, newTodos, updateTodos } from '../controllers/todoController';
import express from 'express';



export default (router:express.Router) => {
    router.post('/todos',newTodos);
    router.get('/todos',getCurrentTodos);
    router.put('/todos:id',updateTodos);
    router.delete('/todos:id',deleteTodos)
}