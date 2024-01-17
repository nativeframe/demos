### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed (latest stable version recommended).
- A 'Video-Client' backend endpoint URL for streaming. You will need to replace the placeholder URL in the configuration.
- The ability to deploy a backend service or run one locally for testing purposes

## Getting Started Backend Service (concept-api folder)

The concept-api, or backend service, serves multiple purposes, for this demo it will show you how to handle requests to both our LSI and Foundation Auth APIs. To begin please follow the steps below, for demoing purposes this can be ran locally, for production purposes you will want to deploy this service.

1\. The first step to getting the service running up and running is to configure your **.env** file. You will see two separate environment variables in this folder, **ENV_URL** and **TOKEN**. For **ENV_URL** you will want to add your backendendpoint to the environment you plan on streaming to, for **TOKEN** you will need to add the access token to the same enviornment you defined for **ENV_URL**. If you do not have access to either of these please reach out to support.

2\. Next install the application dependencies using npm at the route of the application (concept-api folder):
```bash
npm install
```

3\. Finally if everything is configured properly you can begin the service using npm at the route of the application (concept-api folder): 
```bash
npm run start
```

## Getting Started Video Client (react-video-client folder)
The react-video-client demo is the front end section of our demo using React. This demo connects to the Video Client core and web libraries in order to create our Encoder and Manifest player. This is a very basic level demo that is used to showcase the basic features of Video Client and how it functions, it is not designed for production purposes.

1\. To begin you will need to configure a few URLs within the application to connect to the backend service (concept-api) that you created above. If you are doing this locally the default URL for the concept-api is http://localhost:3005. If you have chosen to deploy the service the endpoint will be different.
 - Service Endpoint Line 63: /src/components/encoder/EncoderContext.tsx
 - Service Endpoint Line 31: /src/components/player/StreamsGrid.tsx
 - Service Endpoint Line 56: /src/utils/token-refresher.ts

2\. Next you will need to configure the URLs for your **backendEndpoint**, this should be the same URL that you used for your **ENV_URL** in your service (concept-api).
 - Backend Endpoint Line 21: react-video-client/src/hooks/useVideoClient.ts

3\. Now the everything is configured install the application dependencies using npm at the route of the application (react-video-client folder):
```bash
npm install
```

4\. Finally the application is ready to be ran, start the application using npm at the route of the application (react-video-client folder):
```bash
npm run start
```

5\. Once the application is up and running you will have both an Encoder and Manifest page that you can route to:
  - Encoder URL: http://localhost:3000
  - Manifest URL: http://localhost:3000/manifest