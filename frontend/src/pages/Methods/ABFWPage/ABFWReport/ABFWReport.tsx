import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
} from "@chakra-ui/react";
import { ABFWReportData } from "../../../../interfaces/abfw";
import { phonems } from "../words";
import PhonemReportCell from "./PhonemReportCell";
import TotalRow from "./TotalRow";
import HeaderReportRow from "./HeaderReportRow";

interface Props {
    info: { age: string; name: string; date: string };
    data: ABFWReportData;
    wordToTranscriptionMap: { [key: string]: string[] };
}
const ABFWReport = ({
    info,
    data: { processedImitation, processedNomeation, processedTotal },
    wordToTranscriptionMap,
}: Props) => {
    const calculateTotals = (processedData: any) => {
        let totalCorrect = 0;
        let totalWrong = 0;

        Object.values(processedData).forEach((phonemeData: any) => {
            if (phonemeData) {
                totalCorrect += phonemeData.correct;
                totalWrong += phonemeData.wrong;
            }
        });

        const total = totalCorrect + totalWrong;
        const percentage = total > 0 ? totalCorrect / total : 0;

        return { totalCorrect, totalWrong, percentage };
    };

    const imitationTotals = calculateTotals(processedImitation);
    const nomeationTotals = calculateTotals(processedNomeation);
    const overallTotals = calculateTotals(processedTotal);

    return (
        <Box p={6}>
            <VStack align="stretch" gap={4} mb={6}>
                <Heading size="2xl" textAlign="center">
                    Relatório ABFW
                </Heading>
                <Box
                    border="2px solid"
                    borderColor="blue.200"
                    borderRadius="md"
                    p={4}
                    bg="blue.50"
                >
                    <HStack justify="space-between" gap={8}>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">
                                Nome:
                            </Text>
                            <Text fontSize="lg">{info.name}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">
                                Idade:
                            </Text>
                            <Text fontSize="lg">{info.age} anos</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">
                                Data:
                            </Text>
                            <Text fontSize="lg">
                                {info.date.split("-").reverse().join("/")}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            </VStack>
            <Grid
                templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
                gap={4}
            >
                <Box>
                    <Heading
                        size="md"
                        bg="blue.600"
                        color="white"
                        p={2}
                        borderRadius="md"
                        mb={2}
                        textAlign="center"
                    >
                        Imitação
                    </Heading>
                    <Grid templateColumns="1fr" width="100%">
                        <HeaderReportRow />
                        {phonems.map((phonem, index) => {
                            return (
                                <PhonemReportCell
                                    key={phonem + "1"}
                                    phonem={phonem}
                                    phonemData={processedImitation[phonem]}
                                    index={index}
                                    wordToTranscriptionMap={
                                        wordToTranscriptionMap
                                    }
                                />
                            );
                        })}
                        <TotalRow
                            totalCorrect={imitationTotals.totalCorrect}
                            totalWrong={imitationTotals.totalWrong}
                            percentage={imitationTotals.percentage}
                        />
                    </Grid>
                </Box>

                <Box>
                    <Heading
                        size="md"
                        bg="purple.600"
                        color="white"
                        p={2}
                        borderRadius="md"
                        mb={2}
                        textAlign="center"
                    >
                        Nomeação
                    </Heading>
                    <Grid templateColumns="1fr" width="100%">
                        <HeaderReportRow />
                        {phonems.map((phonem, index) => {
                            return (
                                <PhonemReportCell
                                    key={phonem + "2"}
                                    phonem={phonem}
                                    phonemData={processedNomeation[phonem]}
                                    index={index}
                                    wordToTranscriptionMap={
                                        wordToTranscriptionMap
                                    }
                                />
                            );
                        })}
                        <TotalRow
                            totalCorrect={nomeationTotals.totalCorrect}
                            totalWrong={nomeationTotals.totalWrong}
                            percentage={nomeationTotals.percentage}
                        />
                    </Grid>
                </Box>

                <Box>
                    <Heading
                        size="md"
                        bg="green.600"
                        color="white"
                        p={2}
                        borderRadius="md"
                        mb={2}
                        textAlign="center"
                    >
                        Total
                    </Heading>
                    <Grid templateColumns="1fr" width="100%">
                        <HeaderReportRow />
                        {phonems.map((phonem, index) => {
                            return (
                                <PhonemReportCell
                                    key={phonem + "3"}
                                    phonem={phonem}
                                    phonemData={processedTotal[phonem]}
                                    index={index}
                                    wordToTranscriptionMap={
                                        wordToTranscriptionMap
                                    }
                                />
                            );
                        })}
                        <TotalRow
                            totalCorrect={overallTotals.totalCorrect}
                            totalWrong={overallTotals.totalWrong}
                            percentage={overallTotals.percentage}
                        />
                    </Grid>
                </Box>
            </Grid>
        </Box>
    );
};

export default ABFWReport;
