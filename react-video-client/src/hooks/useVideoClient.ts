import { VideoClient, types } from '@video/video-client-web';
import { useState, useEffect } from 'react';
import { backendEndpoint } from '../config/backend-endpoint';
import { tokenRefresher } from '../utils/token-refresher';
import { getRandomName } from '../utils/names';

const useVideoClient = async (scope: string, events: any) => {
  const [videoClient, setVideoClient] = useState<types.VideoClientAPI | null>(null);
  const [privateKey, setPrivateKey] = useState<string>('');


  useEffect(() => {

  }, []);

  useEffect(() => {
    if (!videoClient) {

      // This is just grabbing a random name from our list, all displayNames and userIds should be unique.
      const user = `demoUser${getRandomName()}${Math.floor(Math.random() * 10)}`;
      let privateKey: string = '';
      // ** REQUIRED **
      // You must add your service endpoint here in order to use this demo.
      // ** REQUIRED **
      // Fetching our private key for the user we plan to broadcast with.
      (async function () {
        await fetch(` http://localhost:3005/private-key?user=${user}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            // Store the private key
            console.log("!!--!!", data)
            privateKey = data.results.pvtKey;
          })
          .catch(error => {
            console.error('Error:', error.message);
          });
      })

      // If you do not have a backendEndpoint, contact a support representative to get one
      const videoClientOptions: types.VideoClientOptions = {
        backendEndpoints: [backendEndpoint],
        token: tokenRefresher({
          backendEndpoint,
          authUrl: `${backendEndpoint}/apps/demos/api/demo/v1/access-token`,
          streamKey: privateKey,            // A unique identifier for the stream 
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
  }, [videoClient, privateKey]);

  return videoClient;
};

export default useVideoClient;
