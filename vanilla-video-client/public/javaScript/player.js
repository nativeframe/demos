function player(vc, player) {

  //Click handler for playing/pausing the video
  function handlePlayerPlay() {
    player.localVideoPaused = !player.localVideoPaused;
  }

  //Click handler for muting/unmuting the video
  function handlePlayerMute() {
    player.localAudioMuted = !player.localAudioMuted;
  }
  
  //Click handler for entering fullScreen mode
  function handlePlayerFullScreen() {
    document.getElementById("playerWrapper").requestFullscreen();
  }
  
  //Event listeners to trigger our click handler functions when button elements are clicked
  document
    .getElementById("playerPlayButton")
    .addEventListener("click", handlePlayerPlay, false);
  document
    .getElementById("playerMuteButton")
    .addEventListener("click", handlePlayerMute, false);
  document
    .getElementById("playerFullScreenButton")
    .addEventListener("click", handlePlayerFullScreen, false);

}

