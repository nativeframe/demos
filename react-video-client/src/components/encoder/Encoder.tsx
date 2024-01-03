import {
  CameraButton,
  ControlBar,
  EncoderAudioDeviceSelect,
  EncoderResolutionSelect,
  EncoderVideo,
  EncoderVideoDeviceSelect,
  FullscreenButton,
  JoinBroadcastButton,
  MediaContainer,
  MicrophoneButton,
  ScreenCaptureButton,
  SettingsButton,
  SettingsSidebar,
} from '@video/video-client-web';
import React from 'react';

// Encoder components used to create a broadcast and change encoder settings
export const Encoder: React.FC = () => {
  return (
    <div className="encoder">
        <MediaContainer>
          <EncoderVideo />
          <ControlBar variant={'encoder'}>
            <CameraButton />
            <MicrophoneButton />
            <JoinBroadcastButton
              broadcastOptions={{ streamName: 'Demo Stream' }}
            />
            <ScreenCaptureButton />
            <FullscreenButton />
            <SettingsButton />
          </ControlBar>
          <SettingsSidebar>
            <div>
              <EncoderVideoDeviceSelect />
              <EncoderAudioDeviceSelect />
              <EncoderResolutionSelect />
            </div>
          </SettingsSidebar>
        </MediaContainer>
      <div className="encoder-label">
        <p className="encoder-label-text">Encoder</p>
      </div>
    </div>
  );
};
