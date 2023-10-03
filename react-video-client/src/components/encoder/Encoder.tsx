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
} from '@livelyvideo/video-client-web';
import React from 'react';
import { CallContextWrapper } from './CallContextWrapper';

interface EncoderProps {
  setCallId: (id: string | null) => void;
}

// Encoder components used to create a broadcast and change encoder settings
export const Encoder: React.FC<EncoderProps> = ({ setCallId }) => {
  return (
    <div className="encoder">
        <MediaContainer>
          <EncoderVideo />
          <ControlBar variant={'encoder'}>
            <CameraButton />
            <MicrophoneButton />
            <JoinBroadcastButton
              setCallId={setCallId}
              broadcastOptions={{ streamName: 'stream name' }}
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
