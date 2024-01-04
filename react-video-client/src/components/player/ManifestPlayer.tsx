// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";
import { Player } from "./Player";
import useVideoClient from "../../hooks/useVideoClient";

const MyManifestPlayerApp = (manifestUrl: string) => {
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);


  const videoClient = useVideoClient('viewer');

  useEffect(() => {
    if (videoClient != null && playerUi == null && manifestUrl) {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = videoClient.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    }
    return () => {
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [videoClient, playerUi, manifestUrl]);

  if (!manifestUrl) {
    return <h3>Please input a valid manifest url.</h3>;
  }

  if (playerUi == null) {
    return <></>;
  }

  return (
    <PlayerUiContext.Provider value={playerUi}>
      <Player />
    </PlayerUiContext.Provider>
  );
};

export default MyManifestPlayerApp;