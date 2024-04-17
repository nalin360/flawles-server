import { TodoModel } from "../database/todos";

// utils/todoHelper.ts

// Function to create a new to-do item
export const createTodo = async (userId:string, content:string, parentId = null) => {
 const newTodo = new TodoModel({
    userId,
    content,
    parentId, // Set the parentId if this is a sub-task
 });
 return await newTodo.save();
};

// Function to get all to-do items for a user, including sub-tasks
export const getTodos = async (userId:string) => {
 // You might need to adjust this query based on how you're storing and querying hierarchical data
 return await TodoModel.find({ userId }).populate('children');
};

// Function to update a to-do item
export const updateTodo = async (todoId:any, update:any) => {
 return await TodoModel.findByIdAndUpdate(todoId, update, { new: true });
};

// Function to delete a to-do item
export const deleteTodo = async (todoId:string) => {
 return await TodoModel.findByIdAndDelete(todoId);
};
