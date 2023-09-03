import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShowList from './components/ShowList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenceTracker from './components/ExpenceTracker';

function App() {
  const success = () => {
    return false
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowList></ShowList>}></Route>
        <Route path='/add' element={<ExpenceTracker ontrue={false} onClose={true}></ExpenceTracker>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
