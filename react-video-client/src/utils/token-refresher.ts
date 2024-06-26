// Utility: tokenRefresher
// About: The main purpose of this utility is to create the token refresher necessary to create valid tokens for the Video Client.
import { serviceEndpoint } from "../globalConfigs";
interface tokenOptions {
  scopes: string[];
  userId: string;
  data: {
    displayName: string;
    mirrors?: {
      id: string;
      streamName: string;
      kind: string;
      clientEncoder: string;
      streamKey: string;
      clientReferrer: string;
    }[];
  };
}

// Functions as a Refresher for fetching our token
export const tokenRefresher = (user: string, privateKey: string) => {
  // You need to return a promise for this to work properly
  return async () => {
    let token;
    // These options are setup for a broadcaster
    const options = {
      scopes: ["broadcaster"],
      userId: "admin",
      data: {
        displayName: user,
        mirrors: [
          {
            id: privateKey,
            streamName: "demo", // Make sure this name matches the name you are passing to the broadcastOptions or your stream will not appear.
            kind: "pipe",
            clientEncoder: "demo",
            streamKey: privateKey,
            clientReferrer: "staging",
          },
        ],
      },
    };
    try {
      token = await fetchToken(options);
    } catch (error) {
      console.error("unable to get access token", {
        error,
      });
      throw error;
    }
    return token;
  };
};

export const fetchToken = async (options: tokenOptions) => {
  const response = await fetch(`${serviceEndpoint}/auth-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const body = await response.json();
  return body.token;
};
