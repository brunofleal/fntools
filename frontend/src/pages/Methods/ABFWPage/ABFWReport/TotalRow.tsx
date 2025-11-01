import { Box, Grid, HStack, Text } from "@chakra-ui/react";

interface Props {
    totalCorrect: number;
    totalWrong: number;
    percentage: number;
    showLabel: boolean;
}

const TotalRow = ({
    totalCorrect,
    totalWrong,
    percentage,
    showLabel,
}: Props) => {
    const getBackgroundColor = (percentage: number) => {
        const percentValue = percentage * 100;
        if (percentValue === 100) return "green.300"; // ADEQUADO
        if (percentValue >= 85) return "white"; // TRANSTORNO LEVE
        if (percentValue >= 65) return "yellow.300"; // TRANSTORNO LEVEMENTE MODERADO
        if (percentValue >= 50) return "orange.500"; // TRANSTORNO MODERADAMENTE SEVERO
        return "red.500"; // TRANSTORNO SEVERO
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
            templateColumns={{
                base: "50px 0.8fr 0.8fr 70px",
                sm: "60px 1fr 1fr 90px",
                md: "80px 1fr 1fr 120px",
            }}
            border="1px solid"
            borderColor="gray.300"
            bg="gray.200"
            fontWeight="bold"
        >
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
                fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
            >
                TOTAL
            </Box>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
            ></Box>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
            ></Box>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                textAlign="center"
                bg={getBackgroundColor(percentage)}
            >
                <HStack
                    bgColor="white"
                    justifyContent="center"
                    gap={{ base: 0, sm: 1 }}
                >
                    <Text
                        color="green.500"
                        fontSize={{ base: "10px", sm: "2xs", md: "xs" }}
                    >
                        {totalCorrect}
                    </Text>
                    <Text fontSize={{ base: "10px", sm: "2xs", md: "xs" }}>
                        /
                    </Text>
                    <Text fontSize={{ base: "10px", sm: "2xs", md: "xs" }}>
                        {totalCorrect + totalWrong}
                    </Text>
                </HStack>
                <Text fontSize={{ base: "10px", sm: "2xs", md: "xs" }}>
                    {(percentage * 100).toFixed(0)}%
                </Text>
                <Text
                    display={showLabel ? "block" : "none"}
                    fontSize={{ base: "8px", sm: "10px", md: "2xs" }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {getResultLabel(percentage)}
                </Text>
            </Box>
        </Grid>
    );
};

export default TotalRow;
