import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
} from "@video/video-client-web";
import { Player } from "./Player";
import useVideoClient from "../../hooks/useVideoClient";
import { streamType, StreamsGrid } from "./StreamsGrid";
import { fetchToken } from "../../utils/token-refresher";

export const ManifestPlayer = () => {
  const [manifestUrl, setManifestUrl] = useState<string>('');
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
  const [token, setToken] = useState<string>('');

  const selectStream = (stream: streamType): void => {
    setManifestUrl(stream.manifest)
  };

  const videoClient = useVideoClient('viewer');

  const fetchData = async () => {
    let manifest = manifestUrl.split('=')[0];
        
    // Now we are grabbing our streamkey so we can use it in our token request.
    let streamKey: string | string[] = manifest.split('/');

    streamKey = streamKey[streamKey.length - 1];

    streamKey = streamKey.slice(0, streamKey.lastIndexOf('.'));
      const tokenOptions = {
        scopes: ['private-viewer'], // Scope for viewers.
        userId: 'viewer', // Replace this with your userId.
        ttl: 1800, // How long the token lasts, this would be 30 minutes.
        data:{
          displayName:"viewer", // Replace with your displayName.
          streamKey, // The streamKey we extracted from the manifestUrl above.
        }
      };
      // Create our token using our fetchToken helper function.
    const token = await fetchToken(tokenOptions);
    setToken(token);
    manifest = manifest + "=" + token;
    return manifest;
  };

  useEffect(() => {
    if (videoClient != null && playerUi == null && manifestUrl != '' && token != '') {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = videoClient.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    } else if (manifestUrl != '' && token == '') {
      const fetchDataAndUpdateState = async () => {
        setManifestUrl(await fetchData());
      };
  
      fetchDataAndUpdateState(); 
    }
    return () => {
      setManifestUrl('');
      setToken('');
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [videoClient, playerUi, manifestUrl, token]);


  return (
    <>
      {
        playerUi ?
          <PlayerUiContext.Provider value={playerUi}>
            <Player />
          </PlayerUiContext.Provider>
          :
          <h3>Please fetch your streams by clicking the button below and select one from the list below.</h3>
      }
      <StreamsGrid selectStream={selectStream} />
    </>

    

  );
};

export default ManifestPlayer;