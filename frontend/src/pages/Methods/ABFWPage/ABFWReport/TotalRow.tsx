import { Box, Grid, HStack, Text } from "@chakra-ui/react";

interface Props {
    totalCorrect: number;
    totalWrong: number;
    percentage: number;
}

const TotalRow = ({ totalCorrect, totalWrong, percentage }: Props) => {
    const getBackgroundColor = (percentage: number) => {
        const percentValue = percentage * 100;
        if (percentValue === 100) return "green.300";
        if (percentValue >= 85) return "yellow.300";
        if (percentValue >= 65) return "orange.300";
        if (percentValue >= 50) return "orange.500";
        return "red.500";
    };

    const getResultLabel = (percentage: number) => {
        const percentValue = percentage * 100;
        if (percentValue === 100) return "Adequado";
        if (percentValue >= 85) return "Transtorno Leve";
        if (percentValue >= 65) return "Transtorno Levemente Moderado";
        if (percentValue >= 50) return "Transtorno Moderadamente Severo";
        return "Transtorno Severo";
    };

    return (
        <Grid
            templateColumns="80px 1fr 1fr 120px"
            border="1px solid"
            borderColor="gray.300"
            bg="gray.200"
            fontWeight="bold"
        >
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                TOTAL
            </Box>
            <Box p={2} borderRight="1px solid" borderColor="gray.300"></Box>
            <Box p={2} borderRight="1px solid" borderColor="gray.300"></Box>
            <Box p={2} textAlign="center" bg={getBackgroundColor(percentage)}>
                <HStack bgColor="white" justifyContent="center">
                    <Text color="green.500">{totalCorrect}</Text>
                    <Text>/</Text>
                    <Text>{totalCorrect + totalWrong}</Text>
                </HStack>
                <Text>{(percentage * 100).toFixed(0)}%</Text>
                <Text fontSize="xs">{getResultLabel(percentage)}</Text>
            </Box>
        </Grid>
    );
};

export default TotalRow;
