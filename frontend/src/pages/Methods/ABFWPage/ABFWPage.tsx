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
import Instructions from "./Instructions";
import { phonemes, wordsImitation, wordsNomeation } from "./words";
import PhoneticInputCell from "./PhoneticInputCell/PhoneticInputCell";
import { SourceAndTarget } from "../../../interfaces/word";
import { BsFileEarmarkText } from "react-icons/bs";
import { axiosApi } from "../../../shared/axiosApi";
import { toast, ToastContainer } from "react-toastify";
import { ABFWReportI } from "../../../interfaces/abfw";
import ABFWReport from "./ABFWReport/ABFWReport";

const ABFWPage = () => {
    const [imitationSourcesAndTargets, setImitationSourcesAndTargets] =
        useState<{ [key: number]: SourceAndTarget }>({});
    const [nomeationSourcesAndTargets, setNomeationSourcesAndTargets] =
        useState<{ [key: number]: SourceAndTarget }>({});
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [age, setAge] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [reportResponse, setReportResponse] = useState<ABFWReportI>();

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseInt(value) > 0) {
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
        <Box p={4} maxHeight="86vh" overflowY="auto">
            <ToastContainer />
            <Instructions />
            <HStack gap={4} mb={4}>
                <Box>
                    <label htmlFor="name">Nome</label>
                    <Input
                        id="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Box>
                    <label htmlFor="age">Idade</label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="Idade"
                        value={age}
                        onChange={handleAgeChange}
                        min={1}
                    />
                </Box>
                <Box>
                    <label htmlFor="date">Data</label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Box>
            </HStack>
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
                                sourcesAndTargets={imitationSourcesAndTargets}
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
                                sourcesAndTargets={nomeationSourcesAndTargets}
                            />
                        </GridItem>
                    );
                })}
            </Grid>
            <Button
                size="lg"
                onClick={handleSubmitData}
                loading={isLoading}
                disabled={!isSubmitEnabled}
            >
                <BsFileEarmarkText />
                Gerar Relatório
            </Button>
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
    );
};

export default ABFWPage;
