import React, { useEffect, useState } from "react";
import { Box, Text, Input, HStack, VStack, Field } from "@chakra-ui/react";
import {
    SourceAndTarget,
    WordAndTranscription,
} from "../../../interfaces/word";
import PhoneticKeyboard from "./PhoneticKeyboard";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "../../../components/ui/tooltip";

interface Props {
    index: number;
    wordAndTranscription: WordAndTranscription;
    setSourcesAndTargets: Function;
}
const PhoneticInputCell = ({
    index,
    wordAndTranscription,
    setSourcesAndTargets,
}: Props) => {
    const [transcription, setTranscription] = useState("");

    const updateSourcesAndTargets = () => {
        const sourceAndTarget: SourceAndTarget = {
            source: transcription,
            target: wordAndTranscription.transcription,
        };
        setSourcesAndTargets((sourcesAndTargets: any) => {
            return { ...sourcesAndTargets, [index]: sourceAndTarget };
        });
    };

    useEffect(() => {
        updateSourcesAndTargets();
    }, [wordAndTranscription, transcription]);

    useEffect(() => {
        updateSourcesAndTargets();
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
            w="300px"
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
                <HStack gap={1}>
                    <Field.Root w="fit-content">
                        <Field.Label fontSize="xs" color="gray">
                            <Text>Transcrição fonética</Text>
                            <Tooltip
                                showArrow
                                content={`Esperado: ${wordAndTranscription.transcription.join("")}`}
                                positioning={{ placement: "right" }}
                            >
                                <BsInfoCircle />
                            </Tooltip>
                        </Field.Label>
                        <Input
                            size="xs"
                            value={transcription}
                            onChange={(e) => setTranscription(e.target.value)}
                        />
                    </Field.Root>
                </HStack>
            </Box>
            <PhoneticKeyboard
                currentTranscription={transcription}
                setTranscription={setTranscription}
                children={WordIdentifier}
            />
        </HStack>
    );
};

export default PhoneticInputCell;
