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
            templateColumns="auto auto auto auto"
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
                align="center"
                justifyContent="center"
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
                align="center"
                justifyContent="center"
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
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={getBackgroundColor(percentage)}
            >
                <VStack gap={0}>
                    <Text>{(percentage * 100).toFixed(0)}%</Text>
                    <Text fontSize="xs">
                        ({correct}/{correct + wrong})
                    </Text>
                </VStack>
            </Box>
        </Grid>
    );
};

export default PhonemReportCell;
