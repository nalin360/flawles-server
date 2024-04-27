import { UserModel } from "../database/user";
import { Board, IWorkItem } from "../database/WorkSchema";

// Helper function to get all boards
export const getBoards = () => Board.find();

// Helper function to get a board by its ID
export const getBoardById = (boardId: string) => Board.findById(boardId);

// Helper function to get a board by its boardID
export const getBoardByBoardId = (boardId: string) => Board.findOne({ boardID: boardId });

// Helper function to create a new work item


export const createBoard = async (boardId: string, boardName:string,boardDesc:string, initialWorkItems: { todo?: any[], do?: any[], done?: any[] } = {}) => {
    // Create a new board with the provided ID and initial work items
    const newBoard = new Board({
        boardID: boardId,
        boardName: boardName,
        boardDesc:boardDesc,
        work: {
            todo: initialWorkItems.todo || [],
            do: initialWorkItems.do || [],
            done: initialWorkItems.done || []
        }
    });

    // Save the new board to the database
    await newBoard.save();

    return newBoard;
};

export const createWorkItem = async (boardId: string, workType: string, title: string, content: string) => {
    // Find the board by its ID
    const board = await Board.findOne({ boardID: boardId });
    if (!board) throw new Error('Board not found');

    // Check if the work type exists and initialize it if not
    if (!board.work[workType]) {
        board.work[workType] = [];
    }

    // Add the new work item to the specified work type
    board.work[workType]?.push({ title, content });

    // Save the updated board to the database
    await board.save();

    return board;
};


// Helper function to get all work items of a specific type
export const getWorkItems = async (boardId: string, workType: string) => {
    const board = await Board.findOne({boardID:boardId});
    if (!board) throw new Error('Board not found');

    // Ensure the workType array is initialized
    if (!board.work[workType]) {
        board.work[workType] = [];
    }

    return board.work[workType];
};


// Helper function to update a work item
export const updateWorkItem = async (boardId: string, workType: string, itemId: string, updates: Partial<IWorkItem>) => {
    const board = await Board.findOne({boardID : boardId});
    if (!board) throw new Error('Board not found');

    // Ensure the workType array is initialized
    if (!board.work[workType]) {
        board.work[workType] = [];
    }

    const workItems = board.work[workType];
    if (!workItems) throw new Error('Work items not found');

    const index = workItems.findIndex(item => item._id && item._id.toString() === itemId);
    if (index === -1) throw new Error('Work item not found');

    Object.assign(workItems[index], updates);
    await board.save();

    return workItems[index];
};

// Helper function to delete a work item
export const deleteWorkItem = async (boardId: string, workType: string, itemId: string) => {
    const board = await Board.findOne({boardID : boardId});
    if (!board) throw new Error('Board not found');

    // Ensure the workType array is initialized
    if (!board.work[workType]) {
        board.work[workType] = [];
    }

    const workItems = board.work[workType];
    if (!workItems) throw new Error('Work items not found');

    const index = workItems.findIndex(item => item._id && item._id.toString() === itemId);
    if (index === -1) throw new Error('Work item not found');

    workItems.splice(index, 1);
    await board.save();

    return true; // Indicates successful deletion
};