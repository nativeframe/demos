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

      // If you do not have a backendEndpoint, contact a support representative to get one
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: ["https://invertred-staging.devspace.lsea3.generflow.com"],
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
