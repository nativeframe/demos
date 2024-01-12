// Component: Encoder
// About: This components main purpose is to import the VideoClient SDK components used in creation of the Encoder.
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
import { EncoderContext } from './EncoderContext';

export const Encoder: React.FC = () => {
  return (
    <EncoderContext>
      <div className="encoder">
          <MediaContainer>
            <EncoderVideo />
            <ControlBar variant={'encoder'}>
              <CameraButton />
              <MicrophoneButton />
              <JoinBroadcastButton
                broadcastOptions={{ streamName: 'demo' }}
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
      </div>
    </EncoderContext>
  );
};
