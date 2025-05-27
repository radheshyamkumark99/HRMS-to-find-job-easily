import { Track } from "livekit-client";
import {
  AudioTrack,
  GridLayout,
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";

const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile/>
    </GridLayout>
  );
};

export default MyVideoConference;
