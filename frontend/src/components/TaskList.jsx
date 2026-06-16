import TaskItem from "./TaskItem";

function TaskList({tasks, handleDelete, handleToggle, handleEdit, editingId, setEditingId}){
    if(tasks.length==0){
        return(
            <h3 className="empty-task">
                No Tasks Found
            </h3>
        );
    }
    return (
        <div>
            {tasks.map((task)=>(
                <TaskItem
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    handleEdit = {handleEdit}
                    editingId = {editingId}
                    setEditingId = {setEditingId}
                />
            ))}
        </div>
    );
}
export default TaskList;