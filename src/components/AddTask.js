import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text || !day || !time) {
      setErrorMsg("Please fill all task details");
      return;
    }

    onAdd({ text, day, time, reminder });

    setText("");
    setDay("");
    setTime("");
    setReminder(false);
    setErrorMsg("");
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <label className="error-msg">{errorMsg}</label>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="Task Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day</label>
        <input
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label class="remind-me">
          Remind me <span className="optional">(optional)</span>
          <input
            type="checkbox"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
          <span class="checkmark"></span>
        </label>
      </div>

      <input type="submit" value="Add Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
