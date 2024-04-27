    import mongoose, { Document, Schema } from 'mongoose';

    // Define the interface for a work item
    export interface IWorkItem {
        title: string;
        content: string;
    }

    // Define the interface for the work object
    export interface IWork {
        todo: IWorkItem[];
        do: IWorkItem[];
        done: IWorkItem[];
        [key: string]: IWorkItem[] | undefined; // Index signature
    }   

    // Define the interface for a board
    export interface IBoard extends Document {
        boardID: string;
        boardName:string;
        boardDesc:string;
        work: IWork;
        createdBy?: mongoose.Types.ObjectId;
    }

    // Define the schema for a work item
    export const WorkItemSchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true }
    });

    export interface IWorkItem {
        title: string;
        content: string;
        _id?: mongoose.Types.ObjectId; // Optional, for updates
    }

    // Define the schema for the work object
    export const WorkSchema = new Schema({
        todo: [WorkItemSchema],
        do: [WorkItemSchema],
        done: [WorkItemSchema]
    });

    // Define the schema for a board
    export const BoardSchema = new Schema({
        boardID: { type: String, required: true, unique: true },
        boardName:{ type: String, required: true},
        boardDesc:{ type: String, required: true},
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        work: WorkSchema
    });

    // Create a Mongoose model for the board
    const Board = mongoose.model<IBoard>('Board', BoardSchema);

    // Export the model
    export { Board };
