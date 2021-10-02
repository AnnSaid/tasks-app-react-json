import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasksData = async () => {
      const serverData = await fetchTasks();
      setTasks(serverData);
    };
    getTasksData();
  }, []);

  const fetchTasks = async () => {
    const fetchResponse = await fetch("http://localhost:5000/tasks");
    const jsonData = await fetchResponse.json();
    // console.log(fetchResponse);
    // console.log(jsonData);
    return jsonData;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const fetchResponse = await fetch(`http://localhost:5000/tasks/${id}`);
    const jsonData = await fetchResponse.json();
    return jsonData;
  };

  //Add Task
  const addTask = async (task) => {
    const tasksPostResp = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await tasksPostResp.json();
    setTasks([...tasks, newTask]);
  };
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id},{
      method: 'DELETE',
    }`);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const changeRemind = { ...taskToggle, reminder: !taskToggle.reminder };
    const remindTaskResp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(changeRemind),
    });
    const data = await remindTaskResp.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="main">
        <div className="top-intro">
          <h1 className="page-title">Tasks App using ReactJS with Hooks</h1>
        </div>
        <div className="container">
          <Header
            title="My Tasks"
            onAddT={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          ) : (
            <p className="no-task-msg">No Tasks ... Start adding your tasks</p>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
