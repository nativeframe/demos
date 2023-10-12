import {
  types,
  CallContext,
  PlayerUiContext,
} from "@video/video-client-web";
import React, { useEffect, useReducer, useState } from "react";
import { playerReducer } from "../../utils/player-reducer";
import useVideoClient from "../../hooks/useVideoClient";

interface PlayerContextProps {
  callId: string | null;
  children: React.ReactNode;
}

// React Context instances that manage the VideoClient and PlayerUI instances
export const PlayerContext: React.FC<PlayerContextProps> = ({ callId, children }) => {
  const [call, setCall] = useState<types.CallAPI | null>(null);
  
  // To track of the PlayerUI instances
  const [players, setPlayers] = useReducer(playerReducer, []);
  const events = {
    "playerAdded": (ev: any) => setPlayers({ type: "addPlayer", ev }),
    "playerRemoved": (ev: any) => setPlayers({ type: "removePlayer", ev })
  };
  
  // Initialize the VideoClient instance
  const videoClient = useVideoClient('conference-participant', events);

  useEffect(() => {
    if (callId && videoClient && call == null) {
      (async () => {
        const joinedCall: types.CallAPI = await videoClient.joinCall(callId, {});
        setCall(joinedCall);
      })();
    }
    return () => {
      if (call != null) {
        setCall(null);
      }
    };
  }, [videoClient, call, callId]);

  return (
    // @ts-ignore
    <CallContext.Provider value={call}>
      <div className="player">
        <div className="player-label">
          {callId === null ? "Player waiting for a call id" : "Player joined the call"}
        </div>
        {players.length > 0 && (
          <PlayerUiContext.Provider value={players[0].uiState} key={players[0].id}>
            {children}
          </PlayerUiContext.Provider>
        )}
      </div>
    </CallContext.Provider>
  );
}
