const express = require("express");
const router = express.Router();

const processPhonemes = (sourcesAndTargets) => {
    const dataProcessed = {};
    const initialCase = {
        correct: 0,
        wrong: 0,
        occurrences: [],
    };
    for (const sourceAndTarget of sourcesAndTargets) {
        console.log(sourcesAndTargets);

        if (sourceAndTarget.target) {
            console.log(sourceAndTarget);
            sourceAndTarget.target.transcription.forEach((phoneme, index) => {
                const prev = dataProcessed[phoneme]
                    ? dataProcessed[phoneme]
                    : initialCase;
                const isCorrect = sourceAndTarget.target.hits[index];
                const delta = {
                    correct: isCorrect ? 1 : 0,
                    wrong: isCorrect ? 0 : 1,
                    occurrences: [
                        sourceAndTarget.target.transcription.join(""),
                    ],
                };
                const total =
                    prev.correct + delta.correct + prev.wrong + delta.wrong;
                const updated = {
                    correct: prev.correct + delta.correct,
                    wrong: prev.wrong + delta.wrong,
                    percentage:
                        total > 0 ? (prev.correct + delta.correct) / total : 1,
                    occurrences: new Array(
                        new Set(prev.occurrences + delta.occurrences)
                    ),
                };
                dataProcessed[phoneme] = updated;
            });
            return dataProcessed;
        }
    }
};

router.post("/generate-report", (req, res) => {
    const {
        name,
        date,
        age,
        imitationSourcesAndTargets,
        nomeationSourcesAndTargets,
    } = req.body;

    // Validate required parameters
    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!date) {
        return res.status(400).json({ message: "Date is required" });
    }

    if (!age || age <= 0) {
        return res.status(400).json({ message: "Age must be greater than 0" });
    }

    if (
        !imitationSourcesAndTargets ||
        Object.keys(imitationSourcesAndTargets).length === 0
    ) {
        return res
            .status(400)
            .json({ message: "Imitation test data is required" });
    }

    if (
        !nomeationSourcesAndTargets ||
        Object.keys(nomeationSourcesAndTargets).length === 0
    ) {
        return res
            .status(400)
            .json({ message: "Naming test data is required" });
    }

    // Process Data
    console.log({
        imitationSourcesAndTargets: Object.values(imitationSourcesAndTargets),
        nomeationSourcesAndTargets: Object.values(nomeationSourcesAndTargets),
    });
    const processedImitation = processPhonemes(
        Object.values(imitationSourcesAndTargets)
    );
    const processedNomeation = processPhonemes(
        Object.values(nomeationSourcesAndTargets)
    );

    const processedTotal = processPhonemes(
        Object.values(imitationSourcesAndTargets) +
            Object.values(nomeationSourcesAndTargets)
    );

    const results = { processedImitation, processedNomeation, processedTotal };

    res.json({ message: "Report generated successfully!", data: results });
});

module.exports = router;
