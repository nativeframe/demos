import { VideoClient, types } from '@video/video-client-web';
import { useState, useEffect } from 'react';
import { backendEndpoint } from '../config/backend-endpoint';
import { tokenRefresher } from '../utils/token-refresher';
import { uuid } from '../utils/uuid';

const useVideoClient = (scope: string, events: any) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(null);

  useEffect(() => {
    if (!videoClient) {
      // If you do not have a backendEndpoint, contact a support representative to get one
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: [backendEndpoint],
        token: tokenRefresher({
          backendEndpoint,
          authUrl: `${backendEndpoint}/apps/demos/api/demo/v1/access-token`,
          streamKey: uuid(),            // A unique identifier for the stream 
          scope,                        // "conference-owner" | "conference-participant" however when direct streaming use "private-broadcaster" | "private-viewer"
        }),
        loggerConfig: {
          clientName: "your-app-name",  // A human-readable name for identifying logs
          writeLevel: "debug",
        },
      };
      const newVC = new VideoClient(videoClientOptions);
      
      Object.keys(events).forEach(eventKey => {
        newVC.on(eventKey as keyof types.VideoClientEvents, events[eventKey]);
      });

      setVideoClient(newVC);
    }
    
    return () => {
      if (videoClient) {
        Object.keys(events).forEach(eventKey => {
          videoClient.removeAllListeners(eventKey as keyof types.VideoClientEvents);
        });
        videoClient.dispose();
        setVideoClient(null);
      }
    };
  }, [videoClient]);

  return videoClient;
};

export default useVideoClient;
