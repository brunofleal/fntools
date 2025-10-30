import { Box, HStack, VStack, Grid, Text } from "@chakra-ui/react";
import { PhonemeData } from "../../../../interfaces/abfw";

interface Props {
    phonem: string;
    phonemData: PhonemeData;
    index: number;
}
const PhonemReportCell = ({ phonem, phonemData, index }: Props) => {
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
            templateColumns="auto 1fr auto"
            border="1px solid"
            borderColor="gray.300"
            bg={index % 2 === 0 ? "white" : "gray.100"}
            width="350px"
        >
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                fontWeight="bold"
                textAlign="center"
                width={"100px"}
            >
                {phonem}
            </Box>
            <VStack
                align="start"
                gap={1}
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                width={"150px"}
            >
                {occurrences.map((occurrence, idx) => (
                    <Box key={idx} fontSize="sm">
                        {occurrence}
                    </Box>
                ))}
            </VStack>
            <Box
                p={2}
                fontWeight="bold"
                textAlign="center"
                bg={getBackgroundColor(percentage)}
                width={"100px"}
            >
                <HStack p={1} bgColor="white" borderRadius="5%">
                    <Text color="green.500">{correct}</Text>
                    <Text>/</Text>
                    <Text color="red.500">{wrong}</Text>
                </HStack>
                <Text>{(percentage * 100).toFixed(0)}%</Text>
            </Box>
        </Grid>
    );
};

export default PhonemReportCell;
