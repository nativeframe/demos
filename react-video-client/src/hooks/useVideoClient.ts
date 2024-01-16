import { VideoClient, types } from '@video/video-client-web';
import { useState, useEffect } from 'react';
import { tokenRefresher } from '../utils/token-refresher';

const useVideoClient = (scope: string, privateKey?: string | null, user?: string | null) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(null);

  useEffect(() => {
    if (!videoClient) {
      let token;

      // Only broadcasters need a token refresher
      if (user && privateKey) {
        token = tokenRefresher(user, privateKey);
      }
      // ** REQUIRED **
      // You must add your backendEndpoint here in order to use this demo.
      // ** REQUIRED **
      // If you do not have a backendEndpoint, contact a support representative to get one
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: ['{Your Endpoint'],
        token: token
      };
      const newVC = new VideoClient(videoClientOptions);
      

      setVideoClient(newVC);
    }
    
    return () => {
      if (videoClient) {
        videoClient.dispose();
        setVideoClient(null);
      }
    };
  }, [videoClient, privateKey]);

  return videoClient;
};

export default useVideoClient;
