import {
  VideoClient,
  types,
  CallContext,
  PlayerUiContext,
} from "@video/video-client-web";
import React, { useEffect, useReducer, useState } from "react";
import { tokenRefresher } from "../../utils/token-refresher";
import { uuid } from "../../utils/uuid";
import { backendEndpoint } from "../../config/backend-endpoint";
import { playerReducer } from "../../utils/player-reducer";

interface PlayerContextProps {
  callId: string | null;
  children: React.ReactNode;
}

// React Context instances that manage the VideoClient and PlayerUI instances
export const PlayerContext: React.FC<PlayerContextProps> = ({ callId, children }) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(
    null
  );
  const [call, setCall] = useState<types.CallAPI | null>(null);
  const [players, setPlayers] = useReducer(playerReducer, []);

  useEffect(() => {
    if (videoClient == null) {
      // If you do not have a backendEndpoint, contact a support representative to get one
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: [backendEndpoint],
        token: tokenRefresher({
          backendEndpoint,
          authUrl: `${backendEndpoint}/apps/demos/api/demo/v1/access-token`,
          streamKey: uuid(),                // A unique identifier for the stream 
          scope: "conference-participant",  // "conference-owner" | "conference-participant" however when direct streaming use "private-broadcaster" | "private-viewer"
        }),
        loggerConfig: {
          clientName: "your-app-name",      // A human-readable name for identifying logs
          writeLevel: "debug",
        },
      };

      const newVC = new VideoClient(videoClientOptions);
      newVC.on("playerAdded", (ev: any) => {
        setPlayers({ type: "addPlayer", ev });
      });
      newVC.on("playerRemoved", (ev: any) => {
        setPlayers({ type: "removePlayer", ev });
      });

      setVideoClient(newVC);
    }
    return () => {
      if (videoClient != null) {
        // @ts-ignore
        setPlayers({ type: "unmount" });
        videoClient.removeAllListeners("playerAdded");
        videoClient.removeAllListeners("playerRemoved");
        videoClient.dispose();
        setVideoClient(null);
      }
    };
  }, [videoClient]);

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
