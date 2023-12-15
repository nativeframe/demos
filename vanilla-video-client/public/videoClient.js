let token = await tokenRefresher({
    backendEndpoint: domain,
    authUrl: `${domain}/apps/demos/api/demo/v1/access-token`,
    streamKey: uuid(),
    scope: "conference-owner",
    clientReferrer: "demo",
})

const videoClientOptions = {
  backendEndpoints: [domain],
  token: token,
};

//Create your videoClient instance
let vc = new VideoClient.VideoClient(videoClientOptions);

//Initialize and create your mediaController (Note: The media controller should only be initialized once)
//For mobile browsers mediaController.init(); needs to be called on user action like on click
await VideoClient.mediaController.init();
let mediaStreamController =
  await VideoClient.mediaController.requestController();

//Set the defaults for your mediaStreamController
//Note only call methods/set properties for your video using the mediaStreamController
//Calling methods/setting properties on the HTMLVideoElement itself will cause issues with the video.
mediaStreamController.audioMuted = false;
mediaStreamController.videoPaused = false;
mediaStreamController.audioDeviceId = null;
mediaStreamController.videoDeviceId =
  VideoClient.mediaController.videoDevices()[0].deviceId;

//Request your preview player from the VideoClient
const preview = vc.requestPlayer(mediaStreamController);

let video;
// Use the isImplements method on the adapater device to ensure the CREATE_VIDEO_ELEMENT is enabled
if (
  VideoClient.adapter.device.isImplements(
    VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
  )
) {
  //Create the video element using videoClient
  video = VideoClient.adapter.device.createVideoElement();
  //Set a width for the video (this can be done separately if needed)
  video.width = 400;
  //Set the local previews audio to mute so you don't hear yourself
  preview.localAudioMuted = false;
  //Attach the video to the videoElement
  preview.attachTo(video);
}

//Append your newly created video-element with the preview player attached to your document body
document.getElementById("videoWrapper").appendChild(video);

// Click handler for hiding/showing the video
function handleVideo() {
  mediaStreamController.videoPaused =
    !mediaStreamController.videoPaused;
}
//Click handler for muting/unmuting the video
function handleMute() {
  mediaStreamController.audioMuted = !mediaStreamController.audioMuted;
}
//Click handler for entering fullScreen mode.
function handleFullScreen() {
  document.getElementById("videoWrapper").requestFullscreen();
}
//Keeps track of if your are broadcasting/not broadcasting
let broadcasting = false;
//Click handler for creating the call and broadcasting/ending the broadcast/closing the call
async function handleBroadcast() {
  //Options to be passed to the broadcast
  let broadcastOptions = { streamName: "yourStreamName" };
  //Create the call
  let call = await vc.createCall({ userId: "yourUserId" });
  //If you are not broadcasting and the call exists
  if (!broadcasting && call != null) {
    //Create the broadcast and pass the mediaStreamController and broadcastOptions as arguments (It is recommended to always use a return value for this method)
    const broadcast = call.broadcast(
      mediaStreamController,
      broadcastOptions
    );
    //Set broadcasting to true
    broadcasting = true;
  }
  //If you are broadcasting and want to end the broadcast
  else {
    //Dispose of the call (Note: this will also dispose of the call broadcast)
    call.dispose();
    //Set broadcasting to false
    broadcasting = false;
  }
}

document
  .getElementById("videoButton")
  .addEventListener("click", handleVideo, false);
document
  .getElementById("muteButton")
  .addEventListener("click", handleMute, false);
document
  .getElementById("fullScreenButton")
  .addEventListener("click", handleFullScreen, false);
document
  .getElementById("broadcastButton")
  .addEventListener("click", handleBroadcast, false);
};