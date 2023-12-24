import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    deadline: Date,
    status: String,
  });
  
export const Task = mongoose.model('Task', taskSchema);