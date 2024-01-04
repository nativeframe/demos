import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Encoder } from './components/encoder/Encoder';
import { Player } from './components/player/Player';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Encoder />} />
      </Routes>
      <Routes>
        <Route path="/manifest" element={<Player />} />
      </Routes>
    </Router>
  );
};

export default App;
