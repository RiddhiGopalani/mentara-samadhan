import React, { useState } from "react";
import "./App.css";

function App() {

  const [count, setCount] = useState(0);


  const [text, setText] = useState("");

  return (
    <div className="page">
      {/* Counter */}
      <div className="card">
        <h2>Counter</h2>
        <div className="count">{count}</div>
        <div className="row">
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>

      {/* Live Text Preview */}
      <div className="card">
        <h2>Live Text Preview</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p className="preview">{text}</p>
      </div>
    </div>
  );
}

export default App;
