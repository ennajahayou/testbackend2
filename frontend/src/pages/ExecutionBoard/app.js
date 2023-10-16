import React from 'react';
import Sidebar from '../../Sidebar';  // Assurez-vous que ce chemin est correct pour importer votre Sidebar
import ExecutionBoard from './ExecutionBoard';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <ExecutionBoard />
    </div>
  );
}

export default App;
