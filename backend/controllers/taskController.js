const tasks = require("../data/tasks");

//GET All TASKS
const getTasks = (req,res)=>{
    res.status(200).json([...tasks].reverse());
};

//CREATE TASK
const createTask = (req, res) =>{
    const{title} = req.body;
    if(!title || !title.trim()){
        return res.status(400).json({
            message: "Task title is required"
        });
    }
    if(title.trim().length < 3){
        return res.status(400).json({
            message: "Task title must be atleast 3 characters"
        });
    }
    if(title.trim().length > 100){
        return res.status(400).json({
            message: "Maximum 100 characters allowed"
        })
    }
    const existingTask = tasks.find(
        task =>
            task.title.toLowerCase() === title.trim().toLowerCase()
    );
    if(existingTask){
        return res.status(400).json({
            message: "Task already exist"
        });
    }
    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(200).json(newTask);
};

//UpdateTask
const UpdateTask = (req, res)=>{
    const id = Number(req.params.id);
    const { title } = req.body;
    const task = tasks.find(task => task.id === id);

    if(!task){
        return res.status(404).json({
            message: "Task not found"
        });
    }
    if(!title || !title.trim()){
        return res.status(400).json({
            message: "Task title is requried"
        });
    }
    if(title.trim().length<3){
        return res.status(400).json({
            message: "Task title must be atleast 3 characters"
        });
    }
    if(title.trim().length>100){
        return res.status(400).json({
            message: "Maximum 100 characters allowed"
        });
    }
    task.title = title.trim();
    res.status(200).json(task);
}

//Delete function
const deleteTask= (req,res) =>{
    const id = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    if(index === -1){
        return res.status(404).json({
            message: "Task not found"
        });
    }
    tasks.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
};

//TOGGLE
const toggleTask = (req,res)=>{
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    if(!task){
        return res.status(404).json({
            message: "Task not found"
        });
    }
    task.completed = !task.completed;
    res.status(200).json({
        success: true,
        task
    });
};

module.exports = {
    getTasks,
    createTask,
    UpdateTask,
    deleteTask,
    toggleTask
};
