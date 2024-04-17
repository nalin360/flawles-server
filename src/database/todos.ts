import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // This should match the model name
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo', // Reference to itself
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo', // Reference to itself
    }],
});


export const TodoModel = mongoose.model('Todo', todoSchema);
