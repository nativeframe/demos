// in Player.tsx
import React, { useContext, useEffect } from "react";
import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";

export const Player = () => {
  const playerCtx = useContext(PlayerUiContext);

  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PlayerVideo />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton />
        <PlayerFullscreenButton />
        <PlayerNewWindowButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};
