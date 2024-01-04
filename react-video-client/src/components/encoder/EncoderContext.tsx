import {
  EncoderUiState,
  EncoderUiContext,
  VideoClientContext,
  mediaController,
  VideoClient,
  types,
} from '@video/video-client-web';
import React, { useEffect, useState } from 'react';
import { CallContextWrapper } from './CallContextWrapper';
import { getRandomName } from '../../utils/names';
import useVideoClient from '../../hooks/useVideoClient';

interface EncoderContextProps {
  children: React.ReactNode;
}

// React Context instances that manage the VideoClient and EncoderUI instances
export const EncoderContext : React.FC<EncoderContextProps> = ({ children }) => {
  const [encoderUi, setEncoderUi] = useState<EncoderUiState | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    getPrivKey();
  }, [])

  // Initialize the EncoderUi instance
  useEffect(() => {
    if (encoderUi == null) {
      (async () => {
        const mediaControllerOptions: types.MediaControllerOptions = {}
        await mediaController.init(mediaControllerOptions);
        const mediaRequestControllerOptions: Partial<types.MediaStreamControllerOptions> = {};
        const mediaStreamController = await mediaController.requestController(mediaRequestControllerOptions);
        setEncoderUi(new EncoderUiState(mediaStreamController));
      })();
    }

    return () => {
      if (encoderUi != null) {
        encoderUi.dispose();
        setEncoderUi(null);
      }
    };
  }, [encoderUi]);

  const getPrivKey = async() => {
    // This is just grabbing a random name from our list, all displayNames and userIds should be unique.
    const user = `demoUser${getRandomName()}${Math.floor(Math.random() * 10)}`;
    setUser(user);
    // ** REQUIRED **
    // You must add your service endpoint here in order to use this demo.
    // ** REQUIRED **
    // Fetching our private key for the user we plan to broadcast with.
      await fetch(`http://localhost:3005/private-key?user=${user}`)
        .then(response => {
        return response.json();
      })
      .then(data => {
        // Store the private key
        setPrivateKey(data.results.pvtKey);
        console.log("!!--!!", data.results.pvtKey)
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }

 const videoClient = useVideoClient('owner', privateKey, user);

  return (
    videoClient &&
    <VideoClientContext.Provider value={videoClient}>
      <EncoderUiContext.Provider value={encoderUi}>
        <CallContextWrapper>
          {encoderUi != null && children}
        </CallContextWrapper>
      </EncoderUiContext.Provider>
    </VideoClientContext.Provider>
  );
}