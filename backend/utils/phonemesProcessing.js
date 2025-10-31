const specialCharacters = ["r", "s", "l"];
const specialPhonemes = {
    cLv: "cLv",
    cRv: "cRv",
    S_start: "s",
    S_end: "[S]",
    R: "[R]",
};
// Consonant + l + vowel (e.g., "pla", "blo", "klu")
const regexClv = /[pbmtdnkgfvszʃʒɲʎʁ]l[ãaɐɛeeiĩɔoouw]/;
// Consonant + r/x + vowel (e.g., "pra", "bro", "kru")
const regexCrv = /[pbmtdnkgfvszʃʒɲʎʁ][rɾʁ][ãaɐɛeeiĩɔoouw]/;
// s at the end of the syllable (e.g., "pas", "mas")
const regexS_end = /s$/;
// s at the start of the syllable (e.g., "si" in "doce")
const regexS_start = /^s/;
// r/x at the end of the syllable (e.g., "box", "mar")
const regexR = /[rxɾʁ]$/;

const processSyllable = (
    dataProcessed,
    sourceAndTarget,
    syllable,
    syllableTranscriptionStartIndex
) => {
    if (regexClv.test(syllable)) {
        const matchIndex = syllable.search(regexClv);
        const hitIndex = syllableTranscriptionStartIndex + matchIndex + 1; // +1 to get the 'l' position
        const isCorrect = sourceAndTarget.target.hits[hitIndex];
        dataProcessed = addToData(
            dataProcessed,
            sourceAndTarget,
            specialPhonemes.cLv,
            isCorrect
        );
    }
    if (regexCrv.test(syllable)) {
        const matchIndex = syllable.search(regexCrv);
        const hitIndex = syllableTranscriptionStartIndex + matchIndex + 1; // +1 to get the 'r/x' position
        const isCorrect = sourceAndTarget.target.hits[hitIndex];
        dataProcessed = addToData(
            dataProcessed,
            sourceAndTarget,
            specialPhonemes.cRv,
            isCorrect
        );
    }
    if (regexS_end.test(syllable)) {
        const hitIndex = syllableTranscriptionStartIndex + syllable.length - 1; // last character position
        const isCorrect = sourceAndTarget.target.hits[hitIndex];
        dataProcessed = addToData(
            dataProcessed,
            sourceAndTarget,
            specialPhonemes.S_end,
            isCorrect
        );
    } else if (regexS_start.test(syllable)) {
        const hitIndex = syllableTranscriptionStartIndex; // first character position
        const isCorrect = sourceAndTarget.target.hits[hitIndex];
        dataProcessed = addToData(
            dataProcessed,
            sourceAndTarget,
            specialPhonemes.S_start,
            isCorrect
        );
    }
    if (regexR.test(syllable)) {
        const hitIndex = syllableTranscriptionStartIndex + syllable.length - 1; // last character position
        const isCorrect = sourceAndTarget.target.hits[hitIndex];
        dataProcessed = addToData(
            dataProcessed,
            sourceAndTarget,
            specialPhonemes.R,
            isCorrect
        );
    }
    return dataProcessed;
};

const isSpecialSyllablePhonemCase = (syllable) => {
    return (
        regexClv.test(syllable) ||
        regexCrv.test(syllable) ||
        regexS_end.test(syllable) ||
        regexS_start.test(syllable) ||
        regexR.test(syllable)
    );
};

const addToData = (dataProcessed, sourceAndTarget, phoneme, isCorrect) => {
    const initialCase = {
        correct: 0,
        wrong: 0,
        occurrences: [],
    };
    const prev = dataProcessed[phoneme] || initialCase;
    const delta = {
        correct: isCorrect ? 1 : 0,
        wrong: isCorrect ? 0 : 1,
        occurrences: [sourceAndTarget.target.word],
    };
    const total = prev.correct + delta.correct + prev.wrong + delta.wrong;
    const updated = {
        correct: prev.correct + delta.correct,
        wrong: prev.wrong + delta.wrong,
        percentage: total > 0 ? (prev.correct + delta.correct) / total : 1,
        occurrences: Array.from(
            new Set([...prev.occurrences, ...delta.occurrences])
        ),
    };
    dataProcessed[phoneme] = updated;
    return dataProcessed;
};

const processPhonemes = (sourcesAndTargets, phonemesRequested) => {
    let dataProcessed = {};

    for (const sourceAndTarget of sourcesAndTargets) {
        if (!sourceAndTarget || !sourceAndTarget.target) {
            console.log("Skipping invalid sourceAndTarget:", sourceAndTarget);
            continue;
        }

        // Split transcription by syllables (separated by ".")
        const syllables = sourceAndTarget.target.transcription
            .toLowerCase()
            .split(".");

        for (
            let syllableIndex = 0;
            syllableIndex < syllables.length;
            syllableIndex++
        ) {
            const syllable = syllables[syllableIndex];
            let wasSyllableProcessed = false;

            // Process each phoneme in the syllable
            if (isSpecialSyllablePhonemCase(syllable)) {
                wasSyllableProcessed = true;
                dataProcessed = processSyllable(
                    dataProcessed,
                    sourceAndTarget,
                    syllable,
                    syllables.slice(0, syllableIndex).join("").length
                );
            }
            const phonemes = syllable.split("");

            for (
                let phonemeIndex = 0;
                phonemeIndex < phonemes.length;
                phonemeIndex++
            ) {
                const phoneme = phonemes[phonemeIndex];

                if (!phonemesRequested.includes(phoneme)) {
                    // Ignore phonems not in the requested array
                    continue;
                }

                if (specialCharacters.includes(phoneme)) {
                    // Will be covered by processSyllable
                    continue;
                }
                // Calculate the index in the transcriptionWithoutMarkers
                const transcriptionIndex =
                    syllables.slice(0, syllableIndex).join("").length +
                    phonemeIndex;

                const isCorrect =
                    sourceAndTarget.target.hits[transcriptionIndex];
                dataProcessed = addToData(
                    dataProcessed,
                    sourceAndTarget,
                    phoneme,
                    isCorrect
                );
            }
        }
    }

    return dataProcessed;
};

module.exports = {
    processPhonemes,
};
