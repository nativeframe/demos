import {
  EncoderUiState,
  EncoderUiContext,
  VideoClientContext,
  VideoClient,
  mediaController,
  types,
} from '@livelyvideo/video-client-web';
import React, { useEffect, useState } from 'react';
import { tokenRefresher } from '../../utils/token-refresher';
import { uuid } from '../../utils/uuid';
import { backendEndpoint } from '../../config/backend-endpoint';
import { CallContextWrapper } from './CallContextWrapper';

interface EncoderContextProps {
  children: React.ReactNode;
}

// React Context instances that manage the VideoClient and EncoderUI instances
export const EncoderContext : React.FC<EncoderContextProps> = ({ children }) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(null);
  const [encoderUi, setEncoderUi] = useState<EncoderUiState | null>(null);

  // Initialize the VideoClient instance
  useEffect(() => {
    if (!videoClient) {
      const videoClientOptions: types.VideoClientOptions = {
        // If you do not have a backendEndpoint, contact a support representative to get one
        backendEndpoints: [backendEndpoint], 
        token: tokenRefresher({
          backendEndpoint,
          authUrl: `${backendEndpoint}/apps/demos/api/demo/v1/access-token`,
          streamKey: uuid(),            // A unique identifier for the stream
          scope: 'conference-owner',    // "conference-owner" | "conference-participant" however when direct streaming use "private-broadcaster" | "private-viewer"
        }),
        loggerConfig: {
          clientName: 'your-app-name',  // A human-readable name for identifying logs
          writeLevel: 'debug',
        },
      };
      setVideoClient(new VideoClient(videoClientOptions));
    }
    return () => {
      if (videoClient) {
        videoClient.dispose();
        setVideoClient(null);
      }
    };
  }, [videoClient]);

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