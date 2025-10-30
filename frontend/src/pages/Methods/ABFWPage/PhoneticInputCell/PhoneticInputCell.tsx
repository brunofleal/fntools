import React, { useEffect, useState } from "react";
import { Box, Text, Input, HStack, VStack, Field } from "@chakra-ui/react";
import {
    SourceAndTarget,
    WordAndTranscription,
} from "../../../../interfaces/word";
import PhoneticKeyboard from "../PhoneticKeyboard";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "../../../../components/ui/tooltip";
import TranscriptionSelector from "./TranscriptionSelector";

interface Props {
    index: number;
    wordAndTranscription: WordAndTranscription;
    sourcesAndTargets: { [key: number]: SourceAndTarget };
    setSourcesAndTargets: Function;
}
const PhoneticInputCell = ({
    index,
    wordAndTranscription,
    sourcesAndTargets,
    setSourcesAndTargets,
}: Props) => {
    const [wordSource, setWordSource] = useState("");
    const [hits, setHits] = useState<boolean[]>([]);

    const updateSourcesAndTargets = (newHits: boolean[]) => {
        const sourceAndTarget: SourceAndTarget = {
            source: wordSource,
            target: {
                transcription: wordAndTranscription.transcription,
                hits: newHits,
            },
        };
        setSourcesAndTargets((sourcesAndTargets: any) => {
            return { ...sourcesAndTargets, [index]: sourceAndTarget };
        });
    };

    useEffect(() => {
        updateSourcesAndTargets(hits);
    }, [wordAndTranscription, wordSource, hits]);

    useEffect(() => {
        const initHits: boolean[] = Array(
            wordAndTranscription.transcription.length
        ).fill(true);
        setHits(initHits);
        updateSourcesAndTargets(initHits);
    }, []);

    const WordIdentifier = (
        <VStack>
            <Box
                bg="blue.500"
                color="white"
                borderRadius="full"
                w="30px"
                h="30px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize="lg" fontWeight="bold">
                    {index + 1}
                </Text>
            </Box>
            <HStack>
                <Text fontSize="xl">{wordAndTranscription.word}</Text>
            </HStack>
        </VStack>
    );

    return (
        <HStack
            w="400px"
            align="flex-end"
            justify="space-between"
            p={4}
            mb={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            bg="white"
            _hover={{ boxShadow: "md" }}
        >
            {WordIdentifier}
            <Box position="relative">
                <TranscriptionSelector
                    sourcesAndTargets={sourcesAndTargets}
                    setSourcesAndTargets={setSourcesAndTargets}
                    index={index}
                />
                <VStack>
                    <HStack gap={1}>
                        <Field.Root w="fit-content">
                            <Field.Label fontSize="xs" color="gray">
                                <Text>Transcrição fonética</Text>
                            </Field.Label>
                            <Input
                                size="xs"
                                value={wordSource}
                                onChange={(e) => setWordSource(e.target.value)}
                            />
                        </Field.Root>
                    </HStack>
                </VStack>
            </Box>
            <PhoneticKeyboard
                currentTranscription={wordSource}
                setTranscription={setWordSource}
                children={WordIdentifier}
            />
        </HStack>
    );
};

export default PhoneticInputCell;
