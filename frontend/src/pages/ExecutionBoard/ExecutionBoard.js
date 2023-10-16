// App.js
import React from 'react';
import './ExecutionBoard.css';

function ExecutionBoard() {
  return (
    <div className="container">
      <h1>Execution Board</h1>
      <div className="board">
        <div className="column">
          <h2>My Execution</h2>
          <div className="task">
            <p>Create a Wireframe for the Website</p>
            <button>Drop</button>
          </div>
        </div>
        <div className="column">
          <h2>DIO Execution</h2>
          <div className="task">
            <p>Developp the website</p>
            <button>See</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutionBoard;
