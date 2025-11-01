import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Instructions from "./Instructions/Instructions";
import { phonemes, wordsImitation, wordsNomeation } from "./words";
import PhoneticInputCell from "./PhoneticInputCell/PhoneticInputCell";
import { SourceAndTarget } from "../../../interfaces/word";
import { BsFileEarmarkText } from "react-icons/bs";
import { axiosApi } from "../../../shared/axiosApi";
import { toast, ToastContainer } from "react-toastify";
import { ABFWReportI } from "../../../interfaces/abfw";
import ABFWReport from "./ABFWReport/ABFWReport";
import { useNavigate } from "react-router";
import { getTodayDate } from "../../../shared/utils/formatDate";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";

const ABFWPage = () => {
    const [imitationSourcesAndTargets, setImitationSourcesAndTargets] =
        useState<{ [key: number]: SourceAndTarget }>({});
    const [nomeationSourcesAndTargets, setNomeationSourcesAndTargets] =
        useState<{ [key: number]: SourceAndTarget }>({});
    const [name, setName] = useState("");

    const todayDate = getTodayDate();
    const [date, setDate] = useState(todayDate);
    const [age, setAge] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [reportResponse, setReportResponse] = useState<ABFWReportI>();

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow numbers and empty string
        if (
            value === "" ||
            (/^\d+$/.test(value) &&
                parseInt(value) > 0 &&
                parseInt(value) < 100)
        ) {
            setAge(value);
        }
    };

    const handleSubmitData = async () => {
        try {
            setIsLoading(true);
            const payload = {
                name,
                date,
                age: parseInt(age),
                imitationSourcesAndTargets,
                nomeationSourcesAndTargets,
                phonemesRequested: phonemes,
            };

            const response = await axiosApi.post(
                "api/abfw/generate-report",
                payload
            );
            setReportResponse(response.data);

            toast.success("Relatório gerado com sucesso!", {
                position: "top-center",
                autoClose: 15000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Erro ao gerar relatório",
                {
                    position: "top-center",
                    autoClose: 15000,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                }
            );
        } finally {
            setIsLoading(false);
        }
    };

    const isSubmitEnabled = name && age && date;

    const getWordToTranscriptionMap = () => {
        const wordToTranscriptionMap: { [key: string]: string } = {};

        // Add imitation words
        wordsImitation.forEach((word) => {
            wordToTranscriptionMap[word.word] = word.transcription;
        });

        // Add nomeation words
        wordsNomeation.forEach((word) => {
            wordToTranscriptionMap[word.word] = word.transcription;
        });

        return wordToTranscriptionMap;
    };

    return (
        <Box p={2} maxHeight="86vh" overflowY="auto">
            <ToastContainer />
            <Instructions />
            <HStack gap={2} mb={2}>
                <Box>
                    <label htmlFor="name">
                        Nome{" "}
                        <Text as="span" color="red.500">
                            *
                        </Text>
                    </label>
                    <Input
                        id="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        borderColor={name ? "inherit" : "red.500"}
                        _focus={{
                            borderColor: name ? "blue.500" : "red.500",
                        }}
                    />
                </Box>
                <Box>
                    <label htmlFor="age">
                        Idade{" "}
                        <Text as="span" color="red.500">
                            *
                        </Text>
                    </label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="Idade"
                        value={age}
                        onChange={handleAgeChange}
                        min={1}
                        max={99}
                        borderColor={age ? "inherit" : "red.500"}
                        _focus={{
                            borderColor: age ? "blue.500" : "red.500",
                        }}
                    />
                </Box>
                <Box>
                    <label htmlFor="date">
                        Data{" "}
                        <Text as="span" color="red.500">
                            *
                        </Text>
                    </label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        max={todayDate}
                        onChange={(e) => setDate(e.target.value)}
                        borderColor={date ? "inherit" : "red.500"}
                        _focus={{
                            borderColor: date ? "blue.500" : "red.500",
                        }}
                    />
                </Box>
            </HStack>
            {name && age && (
                <Box>
                    <HStack>
                        <Heading fontSize="5xl">Prova de Imitação</Heading>
                    </HStack>
                    <Grid
                        bg="blue.50"
                        border="1px"
                        borderColor="blue.200"
                        borderRadius="md"
                        p={4}
                        mb={4}
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            xl: "repeat(3, 1fr)",
                        }}
                        gap={4}
                    >
                        {wordsImitation.map((word, index) => {
                            return (
                                <GridItem key={word.word}>
                                    <PhoneticInputCell
                                        index={index}
                                        wordAndTranscription={word}
                                        setSourcesAndTargets={
                                            setImitationSourcesAndTargets
                                        }
                                        sourcesAndTargets={
                                            imitationSourcesAndTargets
                                        }
                                    />
                                </GridItem>
                            );
                        })}
                    </Grid>
                    <Box height="1px" bg="gray.300" my={6} width="100%" />
                    <HStack>
                        <Heading fontSize="5xl">Prova de Nomeação</Heading>
                    </HStack>
                    <Grid
                        bg="blue.50"
                        border="1px"
                        borderColor="blue.200"
                        borderRadius="md"
                        p={4}
                        mb={4}
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            xl: "repeat(3, 1fr)",
                        }}
                        gap={4}
                    >
                        {wordsNomeation.map((word, index) => {
                            return (
                                <GridItem key={word.word}>
                                    <PhoneticInputCell
                                        index={index}
                                        wordAndTranscription={word}
                                        setSourcesAndTargets={
                                            setNomeationSourcesAndTargets
                                        }
                                        sourcesAndTargets={
                                            nomeationSourcesAndTargets
                                        }
                                    />
                                </GridItem>
                            );
                        })}
                    </Grid>
                    <HStack justify="space-between" mb={4}>
                        <Button
                            size="lg"
                            onClick={handleSubmitData}
                            loading={isLoading}
                            disabled={!isSubmitEnabled}
                            colorScheme="blue"
                        >
                            <BsFileEarmarkText style={{ marginRight: "8px" }} />
                            {reportResponse
                                ? "Regerar Relatório"
                                : "Gerar Relatório"}
                        </Button>
                        {reportResponse && (
                            <ConfirmDialog
                                openButton={{
                                    label: "Limpar e Recomeçar",
                                    type: "delete",
                                }}
                                title="Confirmar Limpeza"
                                description="Tem certeza que deseja limpar todos os dados e recomeçar? Esta ação não pode ser desfeita."
                                saveLabel="Confirmar"
                                onConfirm={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 300);
                                }}
                            />
                        )}
                    </HStack>
                    {reportResponse ? (
                        <Box>
                            <ABFWReport
                                info={{ age, date, name }}
                                data={reportResponse.data}
                                wordToTranscriptionMap={getWordToTranscriptionMap()}
                            />
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ABFWPage;
