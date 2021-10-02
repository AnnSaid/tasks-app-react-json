import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <p className="task-name">
        {task.text}{" "}
        <FaRegTrashAlt
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </p>
      <div class="date-time">
        <p className="task-time">
          <FaRegCalendar className="icon" />
          {task.day}
        </p>
        <p className="task-clock">
          <FaRegClock className="icon" />
          {task.time} am{" "}
        </p>
      </div>
    </div>
  );
};

export default Task;
