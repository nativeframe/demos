import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
  PeerMutedBadge,
} from "@livelyvideo/video-client-web";
import React, { useContext, useEffect } from "react";

// Player components used to view a broadcast
export const Player = () => {
  const playerCtx = useContext(PlayerUiContext);

  useEffect(() => {
    if (playerCtx) {
      playerCtx.player.localVideoPaused = true;
    }
  }, []);

  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PeerMutedBadge style={{ width: "24px", zIndex: 10, right: "0", bottom: "140px", opacity: "0.4" }} />
      <PlayerVideo />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton classNames="lv-push-left" />
        <PlayerFullscreenButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};
