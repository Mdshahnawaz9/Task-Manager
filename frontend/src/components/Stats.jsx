function Stats({tasks}){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
        task => task.completed
    ).length;
    const pendingTasks = totalTasks - completedTasks;

    return(
        <div className="stats-container">
            <div className="stat-card">
                <h2>{totalTasks}</h2>
                <p>Total Tasks</p>
            </div>
            <div className="stat-card">
                <h2>{completedTasks}</h2>
                <p>Completed</p>
            </div>
            <div className="stat-card">
                <h2>{pendingTasks}</h2>
                <p>Pending</p>
            </div>
        </div>
    );
}

export default Stats;