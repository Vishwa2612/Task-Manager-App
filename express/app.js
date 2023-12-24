import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { Task } from "./lib/task.js";
import { connectToDb } from "./lib/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve("src")));
dotenv.config();

connectToDb(process.env.MONGODB_URI);

app.get('/api', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;
    await Task.findByIdAndUpdate(taskId, { status });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("*",(req,res)=>{
  res.sendFile(path.resolve("","index.html"))
})

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});



