import React from 'react';
import './App.css';
import { Encoder } from './components/encoder/Encoder';
import { EncoderContext } from './components/encoder/EncoderContext';

function App() {
  return (
    <div className='app'>
      <EncoderContext>
        <Encoder/>
      </EncoderContext>
    </div>
  );
}

export default App;
