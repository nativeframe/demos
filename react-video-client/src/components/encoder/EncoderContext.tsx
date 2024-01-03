import {
  EncoderUiState,
  EncoderUiContext,
  VideoClientContext,
  mediaController,
  types,
} from '@video/video-client-web';
import React, { useEffect, useState } from 'react';
import { CallContextWrapper } from './CallContextWrapper';
import useVideoClient from '../../hooks/useVideoClient';

interface EncoderContextProps {
  children: React.ReactNode;
}

// React Context instances that manage the VideoClient and EncoderUI instances
export const EncoderContext : React.FC<EncoderContextProps> = ({ children }) => {
  const [encoderUi, setEncoderUi] = useState<EncoderUiState | null>(null);
  const [vc, setVc] = useState<types.VideoClient | null>(null);



  useEffect(() => {
    console.log("!!--!! blach bla");
    (async () => {
      // Initialize the VideoClient instance
      console.log("!!--!!")
      const vcInstance = await useVideoClient('conference-owner', {})
      console.log("!!--!!", vcInstance)
      setVc(vcInstance);
    })
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

  return (
    vc &&
    <VideoClientContext.Provider value={vc}>
      <EncoderUiContext.Provider value={encoderUi}>
        <CallContextWrapper>
          {encoderUi != null && children}
        </CallContextWrapper>
      </EncoderUiContext.Provider>
    </VideoClientContext.Provider>
  );
}