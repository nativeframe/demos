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

2\. Next you will have to configure all backend and service endpoints to the application, the areas they are located are outlined below.
 - Backend Endpoint Line 7: vanilla-video-client/public/javaScript/manifestPlayer.js 
 - Backend Endpoint Line 25: vanilla-video-client/public/encoder.html
 - Service Endpoint Line 37: vanilla-video-client/public/manifestPlayer.html
 - Service Endpoint Line 5: vanilla-video-client/public/javaScript/utils/token.js
 - Service Endpoint Line 36: vanilla-video-client/public/encoder.html

 3\. Now that we have the endpoints configured you can run the application:
 ```bash
npm run start
```

4\. Once running you will have both a manifest player and encoder up and running.
    Manifest url: http://localhost:3000/manifestPlayer.html
    Encoder url: http://localhost:3000/encoder.html