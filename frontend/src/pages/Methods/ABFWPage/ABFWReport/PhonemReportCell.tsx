import { Box, HStack, VStack, Grid, Text, Button } from "@chakra-ui/react";
import { PhonemeData } from "../../../../interfaces/abfw";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface ToggleButtonProps {
    expanded: boolean;
    onToggle: () => void;
}

const ToggleButton = ({ expanded, onToggle }: ToggleButtonProps) => {
    return (
        <Button
            size="2xs"
            variant="solid"
            bgColor="purple.600"
            color="white"
            onClick={onToggle}
            fontSize={{ base: "2xs", sm: "xs" }}
            mt={expanded ? 1 : 0}
        >
            {expanded ? (
                <>
                    <BsChevronUp style={{ marginRight: "4px" }} />
                    Ocultar
                </>
            ) : (
                <>
                    <BsChevronDown style={{ marginRight: "4px" }} />
                    Mostrar
                </>
            )}
        </Button>
    );
};

interface Props {
    phonem: string;
    phonemData: PhonemeData;
    index: number;
    wordToTranscriptionMap: { [key: string]: string };
    expanded?: boolean;
    setExpanded?: (expanded: boolean) => void;
}
const PhonemReportCell = ({
    phonem,
    phonemData,
    index,
    wordToTranscriptionMap,
    expanded = true,
    setExpanded,
}: Props) => {
    if (!phonemData) {
        return null;
    }

    const { correct, occurrences, percentage, wrong } = phonemData;

    const getBackgroundColor = (percentage: number) => {
        const percentValue = percentage * 100;
        if (percentValue === 100) return "green.300"; // ADEQUADO
        if (percentValue >= 85) return "white"; // TRANSTORNO LEVE
        if (percentValue >= 65) return "yellow.300"; // TRANSTORNO LEVEMENTE MODERADO
        if (percentValue >= 50) return "orange.500"; // TRANSTORNO MODERADAMENTE SEVERO
        return "red.500"; // TRANSTORNO SEVERO
    };

    const displayedOccurrences = expanded ? occurrences : [];

    return (
        <Grid
            templateColumns={{
                base: "50px 0.8fr 0.8fr 70px",
                sm: "60px 1fr 1fr 90px",
                md: "80px 1fr 1fr 120px",
            }}
            border="1px solid"
            borderColor="gray.300"
            bg={index % 2 === 0 ? "white" : "gray.100"}
        >
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ base: "md", sm: "lg", md: "2xl" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {phonem}
            </Box>
            <VStack
                align="center"
                justifyContent="center"
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
            >
                {expanded &&
                    displayedOccurrences.map((occurrence, idx) => (
                        <Box
                            key={idx}
                            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                        >
                            {occurrence}
                        </Box>
                    ))}
                <ToggleButton
                    expanded={expanded}
                    onToggle={() => setExpanded?.(!expanded)}
                />
            </VStack>
            <VStack
                align="center"
                justifyContent="center"
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
            >
                {expanded &&
                    displayedOccurrences.map((occurrence, idx) => (
                        <Box
                            key={idx}
                            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                        >
                            {wordToTranscriptionMap[occurrence]}
                        </Box>
                    ))}
                <ToggleButton
                    expanded={expanded}
                    onToggle={() => setExpanded?.(!expanded)}
                />
            </VStack>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                fontWeight="bold"
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={getBackgroundColor(percentage)}
            >
                <VStack gap={0}>
                    <HStack gap={{ base: 0, sm: 1 }}>
                        <Text fontSize={{ base: "2xs", sm: "xs", md: "md" }}>
                            {(percentage * 100).toFixed(0)}%
                        </Text>
                        <Text fontSize={{ base: "2xs", sm: "xs", md: "xs" }}>
                            ({correct}/{correct + wrong})
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Grid>
    );
};

export default PhonemReportCell;
