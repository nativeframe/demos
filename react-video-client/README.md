### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed (latest stable version recommended).
- A 'Video-Client' backend endpoint URL for streaming. You will need to replace the placeholder URL in the configuration.
- The ability to deploy a backend service or run one locally for testing purposes

## Getting Started Backend Service
1\. Install the project dependencies using npm:
```bash
npm install
```

2\. Next you will need to go to our concept API folder and configure it to work with your endpoints.

3\. Because this is a backend service we can use dotenv in order to do so. You can use whichever method your prefer.

4\. Go to the **.env** file and replace the token and environment url with your own.

5\. Once configured you will need to deploy your service to wherever you are capable of doing so.

6\. It can be run by using:
```bash
npm run start
```

## Getting Started Video Client
1\. Install the project dependencies using npm:
```bash
npm install
```

2\. Next you will have to configure all backend and service endpoints to the application, the areas they are located are outlined below. For the backend enpoint you simply need to add it to a dotenv file using ENV_URL or you will need to change it in the code to a method you prefer.
 - Service Endpoint Line 63: /src/components/encoder/EncoderContext.tsx
 - Service Endpoint Line 31: /src/components/player/StreamsGrid.tsx
 - Service Endpoint Line 56: /src/utils/token-refresher.ts

 3\. Now that we have the endpoints configured you can run the application:
 ```bash
npm run start
```

4\. Once running you will have both a manifest player and encoder up and running.
    Manifest url: http://localhost:3000/manifest
    Encoder url: http://localhost:3000/