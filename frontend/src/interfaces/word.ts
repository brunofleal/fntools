export interface WordAndTranscription {
    word: string;
    transcription: string[];
}

interface WordTarget {
    transcription: string[];
    hits: boolean[];
}

export interface SourceAndTarget {
    source: string;
    target: WordTarget;
}
