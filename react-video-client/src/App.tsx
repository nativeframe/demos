import React from 'react';
import './App.css';
import { Encoder } from './components/encoder/Encoder';
import { EncoderContext } from './components/encoder/EncoderContext';
import { Player } from './components/player/Player';
import { PlayerContext } from './components/player/PlayerContext';

function App() {
  const [activeCallId, setActiveCallId] = React.useState<string | null>(null);

  const setCallId = (id: string | null): void => {
    setActiveCallId(id);
  }
  
  return (
    <div className='app'>
      <EncoderContext>
        <Encoder setCallId={setCallId} />
      </EncoderContext>
      <PlayerContext callId={activeCallId}>
        <Player />
      </PlayerContext>
    </div>
  );
}

export default App;
