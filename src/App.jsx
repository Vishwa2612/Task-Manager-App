import React, { useEffect, useState } from 'react';
import Task from './Task';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import "./input.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDes, setTaskDes] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');
    
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api');
      const task = await response.json();
      setTasks(task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{  
    fetchTasks();
  }, []);


  const addTask = async() => {
    if (!taskInput || !deadlineInput || !taskDes) {
      alert('Task or Deadline is Missing');
      return;
    }
    const newTask = {
      name: taskInput,
      description: taskDes,
      deadline: new Date(deadlineInput),
      status: 'Progress',
    };

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]);
        setTaskDes('');
        setTaskInput('');
        setDeadlineInput('');
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus =async (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
    try {
      const taskId = tasks[index]._id; // Assuming the MongoDB id field is "_id"
      const response = await fetch(`/api/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.log('Error updating task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
    
  const deleteTaskStatus = async(index)=>{
    try{
      const response = await fetch(`/api${ids[index]}`,{
        method:"DELETE",
      });
      if(response.ok){
        fetchTasks();
      } else {
        console.log(error);
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
    <Card className="w-[550px] ml-[500px]">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="taskInput">New Task</Label>
              <Input 
              id="taskInput" 
              placeholder="Enter Task" 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="taskDesc">Task Description</Label>
              <Textarea
              id="taskDesc" 
              value={taskDes}
              onChange={(e) => setTaskDes(e.target.value)}
              placeholder="Type your message here." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="deadLineInput">Select Date</Label>
              <Input
              id="deadLineInput" 
              type="datetime-local"
              value={deadlineInput}
              onChange={(e) => setDeadlineInput(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
        variant="outline"
        onClick={addTask}
        >Add Task</Button>
      </CardFooter>
    </Card>
    <div className='ml-[500px]  mt-4'>
    
    <div className="taskList">
    <div className='border border-white p-5'>
        {tasks.map((task, index) => (
          <Task
          task={task}
          key={index}
          index={index}
          updateTaskStatus={updateTaskStatus}
          deleteTaskStatus={deleteTaskStatus}
          />
        ))}
    </div>
    </div>
    </div>
  </div>
  );
};

export default App;