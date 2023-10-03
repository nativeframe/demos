import { TokenRequest, types } from "@video/video-client-web";

export interface tokenRefresherOptions {
  backendEndpoint: string;  // The backend endpoint provided by Lively
  authUrl: string;          // The URL to the backend authentication service
  streamKey: string;        // A unique identifier for the stream often a UUID
  scope: string;            // "conference-owner" | "conference-participant" however when direct streaming use "private-broadcaster" | "private-viewer"
  displayName?: string;     // A human-readable name used for identifying the stream in a list
  userId?: string;          // A unique identifier for the user who is initiating or is responsible for the stream
  clientReferrer?: string;  // To track the source or referring service
  streamName?: string;      // An optional name for the stream itself, separate from the streamKey
}

// Retrieves and returns an access token in the form of a promise
export const tokenRefresher = (options: tokenRefresherOptions): types.TokenGetter => {
  const mirrors = [
    {
      id: options.streamKey,
      streamName: options.streamName != null ? options.streamName : "demo",
      kind: "rtmp",
      rtmpPath: `/origin_proxy/${options.streamKey}`,
      clientEncoder: "demo",
      streamKey: options.streamKey,
      clientReferrer: options.clientReferrer !== undefined ? options.clientReferrer : null,
    },
  ];

  return async (): Promise<string> => {
    const url = `${options.authUrl}`;
    let token: string;
    try {
      const fetchOptions = {
        scopes: [options.scope],
        userId: options.userId ?? options.streamKey,
        data: {
          displayName: options.displayName ?? options.streamKey,
          mirrors,
        },
      };
      token = await fetchToken(url, fetchOptions);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("unable to get access token", {
        error,
        url,
      });
      throw error;
    }

    return token;
  };
};

// Sends an authentication request to the backend to get a token
export const fetchToken = async (authUrl: string, reqBody: TokenRequest): Promise<string> => {
  const response = await window.fetch(authUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  if (response.status !== 200) {
    throw new Error("Unable to get token");
  }

  const body = await response.json();
  return body.token;
};