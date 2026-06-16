import {useState} from "react";
import API from "../services/api";

function TaskForm({setMessage, setType, tasks, setTasks}){
    const[title, setTitle] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!title.trim()){
            setMessage("Task title is required");
            setType("error");
            return;
        }
        if(title.trim().length < 3){
            setMessage("Task title must be at least 3 characters");
            setType("error");
            return;
        }
        try{
            const response = await API.post("/tasks",{
                title
            });
            setTasks(prev=>[...prev, response.data]);
            setMessage("Task added successfully");
            setType("success");

            setTitle("");
        }catch(error){
            setMessage(
                error.response?.data?.message || "something went wrong"
            );
            setType("error");
        }
    };
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a task..."
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <button type="submit">
                Add Task
            </button>
        </form>
    );
}
export default TaskForm;