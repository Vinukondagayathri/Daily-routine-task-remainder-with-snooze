import { useState } from "react";
import "./style.css";

function App() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task === "" || time === "") {
      alert("Please enter task and time");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task,
      time: time,
      snoozed: false,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setTime("");
  };

  const snoozeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, snoozed: true }
          : item
      )
    );
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: true }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Daily Task Reminder</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((item) => (
          <div className="task" key={item.id}>
            <h3>{item.task}</h3>

            <p>Reminder Time: {item.time}</p>

            {item.snoozed && <p>Snoozed for later</p>}

            {item.completed && <p>Completed ✓</p>}

            <button onClick={() => snoozeTask(item.id)}>
              Snooze
            </button>

            <button onClick={() => completeTask(item.id)}>
              Complete
            </button>

            <button onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
