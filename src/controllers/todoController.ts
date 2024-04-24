import express from 'express';
import { createWorkItem, getWorkItems, createBoard, updateWorkItem, deleteWorkItem } from '../helpers/workHelper';

const router = express.Router();

// Route for creating a new work item

export const createNewBoards = async (req: express.Request, res: express.Response) => {
	try {
		const { boardId } = req.query;
		// const boardIdNumber = parseInt(boardId as string, 10);
        // if (isNaN(boardIdNumber)) {
        //     return res.status(400).json({ message: 'Invalid boardId' });
        // }
		const newBoard = await createBoard(boardId as string);
        
		res.status(201).json(newBoard);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}
export const newWorkItem = async (req: express.Request, res: express.Response) => {
    try {
        // Extract query parameters and body data
        const { boardId, workType } = req.query;
        const { title, content } = req.body;

        // Convert boardId from string to number
        
        // const boardIdNumber = parseInt(boardId as string, 10);
        // if (isNaN(boardIdNumber)) {
        //     return res.status(400).json({ message: 'Invalid boardId' });
        // }

        // Create the work item
        const workItem = await createWorkItem(boardId as string, workType as string, title, content);
        res.status(201).json(workItem);
    } catch (error) {
        res.status(500).json({ message: error }); // It's better to send error.message to get the actual error message
    }
};


// Route for retrieving current work items
export const getCurrentWorkItems = async (req: express.Request, res: express.Response) => {
	// Implement the logic to retrieve work items
	try {
        // boardId id boardId_id
		const { boardId, workType } = req.params;
		const workItem = await getWorkItems(boardId, workType);
		res.status(200).json(workItem);

	} catch (error) {

		res.status(500).json({message: error});
	}


};

// Route for updating work items
export const updateWorkItems = async (req: express.Request, res: express.Response) => {
    try {
        const { boardId, workType, itemId } = req.params;
        const updates = req.body;

        const updatedWorkItem = await updateWorkItem(boardId, workType, itemId, updates);
        res.status(200).json(updatedWorkItem);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


// Route for deleting work items
export const deleteWorkItems = async (req: express.Request, res: express.Response) => {
    try {
        const { boardId, workType, itemId } = req.params;

        await deleteWorkItem(boardId, workType, itemId);
        res.status(200).json({ message: 'Work item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Use the routes
// router.post('/boards/:boardId/work/:workType', newWorkItem);
// Add additional routes for getCurrentWorkItems, updateWorkItems, and deleteWorkItems

export default router;
