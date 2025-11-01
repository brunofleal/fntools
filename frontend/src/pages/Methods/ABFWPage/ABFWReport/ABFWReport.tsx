import {
    Box,
    Grid,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { ABFWReportData } from "../../../../interfaces/abfw";
import { phonemes } from "../words";
import PhonemReportCell from "./PhonemReportCell";
import TotalRow from "./TotalRow";
import HeaderReportRow from "./HeaderReportRow";

interface Props {
    info: { age: string; name: string; date: string };
    data: ABFWReportData;
    wordToTranscriptionMap: { [key: string]: string };
}
const ABFWReport = ({
    info,
    data: { processedImitation, processedNomeation, processedTotal },
    wordToTranscriptionMap,
}: Props) => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [expandedStates, setExpandedStates] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleAllExpanded = () => {
        const allExpanded = Object.values(expandedStates).every(
            (val) => val !== false
        );
        const newState: { [key: string]: boolean } = {};

        // Set all phoneme states
        phonemes.forEach((phonem) => {
            newState[`imitation-${phonem}`] = !allExpanded;
            newState[`nomeation-${phonem}`] = !allExpanded;
            newState[`total-${phonem}`] = !allExpanded;
        });

        setExpandedStates(newState);
    };

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

    const handleDownloadReport = async () => {
        if (reportRef.current) {
            setIsDownloading(true);
            try {
                const canvas = await html2canvas(reportRef.current, {
                    scale: 2,
                    backgroundColor: "#ffffff",
                });
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `relatorio-abfw-${info.name}-${info.date}.png`;
                link.click();

                toast.success("Relatório baixado com sucesso!", {
                    position: "top-center",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            } catch (error) {
                console.error("Error generating report image:", error);
                toast.error("Erro ao baixar relatório", {
                    position: "top-center",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            } finally {
                setIsDownloading(false);
            }
        }
    };

    return (
        <Box p={{ base: 1, md: 2 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                gap={2}
            >
                <Button
                    size={{ base: "sm", md: "md" }}
                    onClick={toggleAllExpanded}
                    color="white"
                    bgColor="purple.600"
                    variant="solid"
                    fontSize={{ base: "xs", md: "sm" }}
                >
                    {Object.values(expandedStates).every(
                        (val) => val !== false
                    ) ? (
                        <>
                            <BsChevronUp style={{ marginRight: "4px" }} />
                            Ocultar Todos
                        </>
                    ) : (
                        <>
                            <BsChevronDown style={{ marginRight: "4px" }} />
                            Mostrar Todos
                        </>
                    )}
                </Button>
                <Button
                    bgColor="black"
                    size={{ base: "md", md: "lg" }}
                    onClick={handleDownloadReport}
                    loading={isDownloading}
                    disabled={isDownloading}
                    _hover={{
                        transform: "translateY(4px)",
                        boxShadow: "lg",
                        bgColor: "purple.400",
                    }}
                    transition="all 0.2s"
                    fontWeight="bold"
                    fontSize={{ base: "sm", md: "md" }}
                >
                    <MdDownload style={{ marginRight: "8px" }} />
                    {isDownloading ? "Baixando..." : "Baixar Relatório"}
                </Button>
            </Box>
            <Box
                border={{ base: "4px double", md: "8px double" }}
                borderColor="blue.500"
                borderRadius="lg"
                bg="white"
                p={{ base: 1, md: 2 }}
            >
                <Box
                    ref={reportRef}
                    border="2px solid"
                    borderColor="blue.200"
                    borderRadius="md"
                    bg="white"
                    p={{ base: 2, sm: 4, md: 8 }}
                >
                    <VStack
                        align="stretch"
                        gap={{ base: 2, md: 4 }}
                        mb={{ base: 4, md: 6 }}
                    >
                        <Heading
                            size={{ base: "lg", sm: "xl", md: "2xl" }}
                            textAlign="center"
                        >
                            Relatório ABFW
                        </Heading>

                        <Box
                            border="2px solid"
                            borderColor="blue.200"
                            borderRadius="md"
                            p={{ base: 2, md: 4 }}
                            bg="blue.50"
                        >
                            <HStack
                                justify="space-between"
                                gap={{ base: 2, md: 4, lg: 8 }}
                                flexWrap={{ base: "wrap", md: "nowrap" }}
                            >
                                <Box minWidth={{ base: "100%", sm: "auto" }}>
                                    <Text
                                        fontWeight="bold"
                                        color="gray.600"
                                        fontSize={{ base: "xs", md: "sm" }}
                                    >
                                        Nome:
                                    </Text>
                                    <Text fontSize={{ base: "sm", md: "lg" }}>
                                        {info.name}
                                    </Text>
                                </Box>
                                <Box minWidth={{ base: "45%", sm: "auto" }}>
                                    <Text
                                        fontWeight="bold"
                                        color="gray.600"
                                        fontSize={{ base: "xs", md: "sm" }}
                                    >
                                        Idade:
                                    </Text>
                                    <Text fontSize={{ base: "sm", md: "lg" }}>
                                        {info.age} anos
                                    </Text>
                                </Box>
                                <Box minWidth={{ base: "45%", sm: "auto" }}>
                                    <Text
                                        fontWeight="bold"
                                        color="gray.600"
                                        fontSize={{ base: "xs", md: "sm" }}
                                    >
                                        Data:
                                    </Text>
                                    <Text fontSize={{ base: "sm", md: "lg" }}>
                                        {info.date
                                            .split("-")
                                            .reverse()
                                            .join("/")}
                                    </Text>
                                </Box>
                            </HStack>
                        </Box>
                    </VStack>
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            lg: "repeat(2, 1fr)",
                            xl: "repeat(3, 1fr)",
                        }}
                        gap={4}
                    >
                        <Box>
                            <Heading
                                size={{ base: "sm", md: "md" }}
                                bg="blue.600"
                                color="white"
                                p={{ base: 1, md: 2 }}
                                borderRadius="md"
                                mb={2}
                                textAlign="center"
                            >
                                Imitação
                            </Heading>
                            <Grid templateColumns="1fr" width="100%">
                                <HeaderReportRow />
                                {phonemes.map((phonem, index) => {
                                    const key = `imitation-${phonem}`;
                                    return (
                                        <PhonemReportCell
                                            key={phonem + "1"}
                                            phonem={phonem}
                                            phonemData={
                                                processedImitation[phonem]
                                            }
                                            index={index}
                                            wordToTranscriptionMap={
                                                wordToTranscriptionMap
                                            }
                                            expanded={
                                                expandedStates[key] ?? true
                                            }
                                            setExpanded={(value) => {
                                                setExpandedStates((prev) => ({
                                                    ...prev,
                                                    [key]: value,
                                                }));
                                            }}
                                        />
                                    );
                                })}
                                <TotalRow
                                    totalCorrect={imitationTotals.totalCorrect}
                                    totalWrong={imitationTotals.totalWrong}
                                    percentage={imitationTotals.percentage}
                                    showLabel={false}
                                />
                            </Grid>
                        </Box>

                        <Box>
                            <Heading
                                size={{ base: "sm", md: "md" }}
                                bg="purple.600"
                                color="white"
                                p={{ base: 1, md: 2 }}
                                borderRadius="md"
                                mb={2}
                                textAlign="center"
                            >
                                Nomeação
                            </Heading>
                            <Grid templateColumns="1fr" width="100%">
                                <HeaderReportRow />
                                {phonemes.map((phonem, index) => {
                                    const key = `nomeation-${phonem}`;
                                    return (
                                        <PhonemReportCell
                                            key={phonem + "2"}
                                            phonem={phonem}
                                            phonemData={
                                                processedNomeation[phonem]
                                            }
                                            index={index}
                                            wordToTranscriptionMap={
                                                wordToTranscriptionMap
                                            }
                                            expanded={
                                                expandedStates[key] ?? true
                                            }
                                            setExpanded={(value) => {
                                                setExpandedStates((prev) => ({
                                                    ...prev,
                                                    [key]: value,
                                                }));
                                            }}
                                        />
                                    );
                                })}
                                <TotalRow
                                    totalCorrect={nomeationTotals.totalCorrect}
                                    totalWrong={nomeationTotals.totalWrong}
                                    percentage={nomeationTotals.percentage}
                                    showLabel={false}
                                />
                            </Grid>
                        </Box>

                        <Box>
                            <Heading
                                size={{ base: "sm", md: "md" }}
                                bg="green.600"
                                color="white"
                                p={{ base: 1, md: 2 }}
                                borderRadius="md"
                                mb={2}
                                textAlign="center"
                            >
                                Total
                            </Heading>
                            <Grid templateColumns="1fr" width="100%">
                                <HeaderReportRow />
                                {phonemes.map((phonem, index) => {
                                    const key = `total-${phonem}`;
                                    return (
                                        <PhonemReportCell
                                            key={phonem + "3"}
                                            phonem={phonem}
                                            phonemData={processedTotal[phonem]}
                                            index={index}
                                            wordToTranscriptionMap={
                                                wordToTranscriptionMap
                                            }
                                            expanded={
                                                expandedStates[key] ?? true
                                            }
                                            setExpanded={(value) => {
                                                setExpandedStates((prev) => ({
                                                    ...prev,
                                                    [key]: value,
                                                }));
                                            }}
                                        />
                                    );
                                })}
                                <TotalRow
                                    totalCorrect={overallTotals.totalCorrect}
                                    totalWrong={overallTotals.totalWrong}
                                    percentage={overallTotals.percentage}
                                    showLabel={true}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default ABFWReport;
