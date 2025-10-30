export interface PhonemeData {
    correct: number;
    wrong: number;
    percentage: number;
    occurrences: string[];
}

export interface ProcessedPhonemes {
    [phoneme: string]: PhonemeData;
}

export interface ABFWReportData {
    processedImitation: ProcessedPhonemes;
    processedNomeation: ProcessedPhonemes;
    processedTotal: ProcessedPhonemes;
}

export interface ABFWReportI {
    message: string;
    data: ABFWReportData;
}
