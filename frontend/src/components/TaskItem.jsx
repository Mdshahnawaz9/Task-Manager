import {useState} from "react";

function TaskItem({task, handleDelete, handleToggle, handleEdit, editingId, setEditingId}){
    const [ newTitle, setNewTitle] = useState(task.title);
    return (
        <div className="task-card">
            {
                editingId === task.id ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e)=> setNewTitle(e.target.value)}
                        className="edit-input"
                    />
                ) : (
                    <h3
                        className="task-title"
                        style={{
                            textDecoration:task.completed
                            ?"line-through"
                            :"none"
                        }}
                    >
                        {task.title}
                    </h3>
                )
            }
            <p
                className={
                    task.completed
                    ?"task-status completed-status"
                    : "task-status pending-status"
                }
            >
                {
                    task.completed
                    ?"✅ Completed"
                    :"⏳ Pending"
                }
            </p>
            <p className="task-date">
                Created Task
            </p>
            <div className="task-actions">
                <button 
                    className="complete-btn"
                    onClick={()=>handleToggle(task.id)}
                >
                    {task.completed ? "Undo":"Completed"}
                </button>
                {
                    editingId === task.id ? (
                        <button
                            className="edit-btn"
                            onClick={()=>
                                handleEdit(task.id, newTitle)
                            }
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="edit-btn"
                            onClick={()=>
                                setEditingId(task.id)
                            }
                        >
                            Edit
                        </button>
                    )
                }
                <button 
                    className="delete-btn"
                    onClick={()=> handleDelete(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;