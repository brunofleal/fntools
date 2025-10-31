export interface WordAndTranscription {
    word: string;
    transcription: string;
}

interface WordTarget {
    word: string;
    transcription: string;
    transcriptionWithoutMarkers: string;
    hits: boolean[];
}

export interface SourceAndTarget {
    source: string;
    target: WordTarget;
}
