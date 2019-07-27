import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import ToolColumn from './components/ToolColumn'

function App() {
  return (
    <div className="App">
        <Header />
        <ToolColumn/>
    </div>
  );
}

export default App;