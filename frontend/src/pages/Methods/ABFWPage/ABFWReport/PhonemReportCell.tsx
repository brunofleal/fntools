import { Box, HStack, VStack, Grid, Text } from "@chakra-ui/react";
import { PhonemeData } from "../../../../interfaces/abfw";

interface Props {
    phonem: string;
    phonemData: PhonemeData;
    index: number;
    wordToTranscriptionMap: { [key: string]: string };
}
const PhonemReportCell = ({
    phonem,
    phonemData,
    index,
    wordToTranscriptionMap,
}: Props) => {
    if (!phonemData) {
        return null;
    }

    const { correct, occurrences, percentage, wrong } = phonemData;

    const getBackgroundColor = (percentage: number) => {
        const percentValue = percentage * 100;
        if (percentValue === 100) return "green.300"; // ADEQUADO
        if (percentValue >= 85) return "yellow.300"; // TRANSTORNO LEVE
        if (percentValue >= 65) return "orange.300"; // TRANSTORNO LEVEMENTE MODERADO
        if (percentValue >= 50) return "orange.500"; // TRANSTORNO MODERADAMENTE SEVERO
        return "red.500"; // TRANSTORNO SEVERO
    };

    return (
        <Grid
            templateColumns="100px 200px 200px 100px"
            border="1px solid"
            borderColor="gray.300"
            bg={index % 2 === 0 ? "white" : "gray.100"}
        >
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                fontWeight="bold"
                textAlign="center"
            >
                {phonem}
            </Box>
            <VStack
                align="start"
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
            >
                {occurrences.map((occurrence, idx) => (
                    <Box key={idx} fontSize="sm">
                        {occurrence}
                    </Box>
                ))}
            </VStack>
            <VStack
                align="start"
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
            >
                {occurrences.map((occurrence, idx) => (
                    <Box key={idx} fontSize="sm">
                        {wordToTranscriptionMap[occurrence]}
                    </Box>
                ))}
            </VStack>
            <Box
                p={2}
                fontWeight="bold"
                textAlign="center"
                bg={getBackgroundColor(percentage)}
            >
                <Text>{(percentage * 100).toFixed(0)}%</Text>
            </Box>
        </Grid>
    );
};

export default PhonemReportCell;
