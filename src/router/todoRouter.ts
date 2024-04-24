
import {
    createNewBoards,
    deleteWorkItems,
    getCurrentWorkItems,
    newWorkItem,
    updateWorkItems
} from '../controllers/todoController';
import express from 'express';


export default (router: express.Router) => {
    router.post('/boards', createNewBoards);
    router.post('/todos', newWorkItem);
    router.get('/todos/boards/:boardId/work/:workType', getCurrentWorkItems);
    router.put('/todos/boards/:boardId/work/:workType/itemID/:itemId', updateWorkItems);
    router.delete('/todos:id', deleteWorkItems)
}