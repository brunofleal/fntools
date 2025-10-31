const express = require("express");
const router = express.Router();
const { processPhonemes } = require("../utils/phonemesProcessing");

router.post("/generate-report", (req, res) => {
    const {
        name,
        date,
        age,
        imitationSourcesAndTargets,
        nomeationSourcesAndTargets,
        phonemesRequested,
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
    const processedImitation = processPhonemes(
        Object.values(imitationSourcesAndTargets),
        phonemesRequested
    );
    const processedNomeation = processPhonemes(
        Object.values(nomeationSourcesAndTargets),
        phonemesRequested
    );

    const processedTotal = processPhonemes(
        [
            ...Object.values(imitationSourcesAndTargets),
            ...Object.values(nomeationSourcesAndTargets),
        ],
        phonemesRequested
    );

    const results = { processedImitation, processedNomeation, processedTotal };

    res.json({ message: "Report generated successfully!", data: results });
});

module.exports = router;
