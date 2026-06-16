import {useState, useEffect} from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Alert from "./components/Alert";
import API from "./services/api";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";

function App(){
  const[message, setMessage] = useState("");
  const[type, setType] = useState("");
  const[tasks, setTasks] = useState([])
  const[editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async() => {
    try{
      const response = await API.get("/tasks");
      setTasks(response.data);
    }catch(error){
    }
  };

  useEffect(()=>{
    if(darkMode){
      document.body.classList.add("dark-mode");
    }else{
      document.body.classList.remove("dark-mode");
    }
  },[darkMode]);

  useEffect(()=>{
    fetchTasks();
  },[]);

  useEffect(()=>{
    if(message){
      const timer = setTimeout(()=>{
        setMessage("");
        setType("");
      },3000);
      return ()=> clearTimeout(timer);
    }
  },[message]);

const openDeleteModal = (id)=>{
  setSelectedTaskId(id);
  setShowDeleteModal(true);
};

  // Delete Handling
  const confirmDelete = async (id)=>{
    try{
      await API.delete(`/tasks/${id}`);

      setTasks(
        tasks.filter(task=>task.id !== id)
      );
      setMessage("Task deleted successfully");
      setType("success");
    }catch(error){
      setMessage("Failed to delete task");
      setType("error");
    }
  };

  // Toggle button handling
  const handleToggle = async(id)=>{
    try{
      const response = await API.patch(
        `/tasks/${id}/toggle`
      );
      setTasks(
        tasks.map(task=>
          task.id === id
          ? response.data.task
          : task
        )
      );
      setMessage("Task status updated");
      setType("success");
    }catch(error){
      setMessage("Failed to update task");
      setType("error");
    }
  };

  const handleEdit = async(id, newTitle)=>{
    if(!newTitle.trim()){
      setMessage("Task title is required");
      setType("error");
      return;
    }
    try{
      const response = await API.put(
        `/tasks/${id}`,
        {
          title: newTitle
        }
      );
      setTasks(
        tasks.map(task =>
          task.id === id
          ? response.data
          : task
        )
      );
      setMessage("Task updated successfully");
      setType("success");

      setEditingId(null);
    }catch(error){
      setMessage(
        error.response?.data?.message || "Failed to update task"
      );
      setType("error");
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return(
    <div className={darkMode? "container dark" : "container"}>
      <div className="header">
        <h1>Task Manager</h1>
        <p>Organize your daily work efficiency</p>
        <button
          className="theme-toggle"
          onClick={()=>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode" }
        </button>
      </div>

      <Alert
        message={message}
        type={type}
      />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e)=> {
            const value = e.target.value;
            setSearchTerm(value);
            const filtered = tasks.filter(task =>
              task.title
              .toLowerCase()
              .includes(value.toLowerCase())
            );
            setSuggestions(filtered);
          }
          }
        />
        {
          searchTerm && suggestions.length > 0 && (
            <div className="suggestions">
              {
                suggestions.map(task =>(
                  <div
                    key={task.id}
                    className="suggestion-item"
                    onClick={()=>{
                      setSearchTerm(task.title);
                      setSuggestions([]);
                    }}
                  >
                    <span className="suggestion-title">
                      {task.title.split(
                        new RegExp(`(${searchTerm})`, "gi")
                      ).map((part,index)=>
                        part.toLowerCase() === searchTerm.toLowerCase()
                        ? (
                          <mark key={index}>
                            {part}
                          </mark>
                        )
                        :part  
                      )}
                    </span>
                    <span className={
                      task.completed
                      ?"status completed"
                      :"status pending"
                    }>
                      {task.completed
                      ?"✅Completed"
                      :"⏳Pending"}
                    </span>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>

      <Stats tasks = {tasks}/>

      

      <TaskForm
        setMessage = {setMessage}
        setType={setType}
        tasks={tasks}
        setTasks={setTasks}
      />

      <TaskList 
        tasks={filteredTasks}
        handleDelete={openDeleteModal}
        handleToggle={handleToggle}
        handleEdit = {handleEdit}
        editingId = {editingId}
        setEditingId = {setEditingId}
      />

      {
        showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>
                Delete Task?
              </h2>
              <p>
                Are you sure you want to delete this task?
              </p>
              <div className="modal-buttons">
                <button className="yes-btn"
                  onClick={()=>{
                    confirmDelete(selectedTaskId);
                    setShowDeleteModal(false);
                  }}
                >
                  Yes Delete
                </button>
                <button className="cancel-btn"
                  onClick={()=>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default App;