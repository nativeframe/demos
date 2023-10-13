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

  // Initialize the VideoClient instance
  const videoClient = useVideoClient('conference-owner', {});

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
    <VideoClientContext.Provider value={videoClient}>
      <EncoderUiContext.Provider value={encoderUi}>
        <CallContextWrapper>
          {encoderUi != null && children}
        </CallContextWrapper>
      </EncoderUiContext.Provider>
    </VideoClientContext.Provider>
  );
}