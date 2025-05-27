import { ReceivedTranscriptionSegment, TrackReferenceOrPlaceholder } from '../../packages/core/dist/index.d.ts';
import { TranscriptionSegment } from 'livekit-client';
/**
 * @alpha
 */
export interface TrackTranscriptionOptions {
    /**
     * how many transcription segments should be buffered in state
     * @defaultValue 100
     */
    bufferSize?: number;
    /**
     * optional callback for retrieving newly incoming transcriptions only
     */
    onTranscription?: (newSegments: TranscriptionSegment[]) => void;
}
/**
 * @returns An object consisting of `segments` with maximum length of opts.windowLength and `activeSegments` that are valid for the current track timestamp
 * @alpha
 */
export declare function useTrackTranscription(trackRef: TrackReferenceOrPlaceholder | undefined, options?: TrackTranscriptionOptions): {
    segments: ReceivedTranscriptionSegment[];
};
//# sourceMappingURL=useTrackTranscription.d.ts.map