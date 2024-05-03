### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed (latest stable version recommended).
- A 'Video-Client' backend endpoint URL for streaming. You will need to replace the placeholder URL in the configuration.


```

## Video Client (vanilla-video-client folder)
The vanilla-video-client demo is the front end section of our demo using Vanilla Javascript. This demo connects to the Video Client Core and Web libraries in order to create our Manifest Player. This is a very basic level demo that is used to showcase the basic features of Video Client and how it functions. **This demo is not designed for production purposes**. Note that in the vanilla demo a bundle for the Video Client dependency is used, please refer to our docs if you need help creating new bundles. 

1\. To begin you will need to configure your **backend endpoint**, this needs to be done in the **globalConfig** file found at **vanilla-video-client/public/javaScript/globalConfigs.js** The **backend endpoint** is the environment to which you would like to stream and play video from.

2\. Now the everything is configured install the application dependencies using npm at the root directory of the application (vanilla-video-client folder):
```bash
npm install
```

3\. Finally the application is ready to be ran, start the application using npm at the root directory of the application (vanilla-video-client folder):
```bash
npm run start
```

4\. Once the application is up and running you will be able to see your manifest player page at: 
    - Manifest URL: http://localhost:3000/manifestPlayer.html
