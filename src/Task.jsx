import React from "react";
import { Button } from "@/components/ui/button";
import "./input.css";

const Task = ({ task, index, updateTaskStatus ,deleteTaskStatus}) => {
  const now = new Date();
  let taskClassName = '';

  const handleButton=()=>{
    deleteTaskStatus(task._id);
  };
  
  if (task.status === 'Completed') {
    taskClassName = 'Completed';
  } else if (task.deadline < now) {
    taskClassName = 'Ended';
    task.status = 'Ended';
  } else {
    taskClassName = 'Progress';
    task.status = 'Progress';
  }
  return (
    <div key={index} className={`task ${taskClassName}`}>
      <div className={`task border border-white mb-5 p-3 ${
      task.status === "Completed"
        ? "bg-green-500" // Green background for Completed
        : task.deadline < now
        ? "bg-red-500" // Red background for Ended
        : "bg-gray-500" // Gray background for Progress
    }`}>
        <div className="flex flex-row ">
          <p className="mr-[150px]">Task: {task.name}</p> 
          <p>Deadline: {task.deadline.toLocaleString()}</p> 
        </div>
        <div className="flex flex-row">
          <p className="mr-[70px]">Task Description:{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
        <br/>
        <div  className="flex flex-row">
          <div className="pr-[130px]">
            <Button 
            variant="outline" 
            onClick={() => 
            updateTaskStatus(index, 
            task.status === 'Completed' ? 'Progress' : 'Completed')
            }>
            {task.status === 'Completed' ? 'Change Status' : 'Complete'}
            </Button>
          </div>
          <div>
          <Button
          variant="outline"
          onClick={handleButton}>
          Delete
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Task;

