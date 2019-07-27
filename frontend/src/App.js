import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import ToolColumn from './components/ToolColumn'
import Tool from "./components/Tool";

function App() {
  return (
    <div className="App">
        <Header />
        <ToolColumn/>
        <Tool/>
    </div>
  );
}

export default App;