import { VideoClient, types } from '@video/video-client-web';
import { useState, useEffect } from 'react';
import { tokenRefresher } from '../utils/token-refresher';
import { backendEndpoint } from '../globalConfigs';

const useVideoClient = (scope: string, privateKey?: string | null, user?: string | null) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(null);

  useEffect(() => {
    if (!videoClient) {
      let token;

      // Only broadcasters need a token refresher
      if (user && privateKey) {
        token = tokenRefresher(user, privateKey);
      }
      // Setting the generated token and the backendEndpoint for the options to be passed to our new VideoClient instance
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: [backendEndpoint],
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
