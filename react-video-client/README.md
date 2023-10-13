# React Video Client

React Video Client is a React application that demonstrates how to use the Video-Client library to encode and view video streams. It provides a simple boilerplate for using the Video-Client Encoder and Web Player components. The Encoder component allows you to select a camera and microphone, and then broadcast a stream. The Web Player component allows you to view the stream by joining a call using a call id provided by the Encoder.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed (latest stable version recommended).
- A 'Video-Client' backend endpoint URL for streaming. You will need to replace the placeholder URL in the configuration.

### Installation

1\. Install the project dependencies using npm:
```bash
npm install
```

## Usage

### Configuration  

Before running the app, you need to configure the backend endpoint:
Open the src/config/backend-endpoint.ts file.
Update the backendEndpoint const with your 'Video-Client' backend endpoint URL:
```javascript
export const backendEndpoint = 'https://your-backend-url.com';
```

### Running the App
Once you have configured the backend endpoint, you can start the React Video Client application using:
```bash
npm run start
```

This will start the development server, and you can access the app in your web browser at http://localhost:3000.

## Contributing

We welcome contributions to improve the React Video Client. Feel free to open issues, submit pull requests, or provide feedback.