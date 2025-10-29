import React from "react";
import { Box, Text, Input, HStack, VStack, Field } from "@chakra-ui/react";
import { WordAndTranscription } from "../../../interfaces/word";
import PhoneticKeyboard from "./PhoneticKeyboard";

interface Props {
    index: number;
    wordAndTranscription: WordAndTranscription;
}
const PhoneticInputCell = ({ index, wordAndTranscription }: Props) => {
    const onSymbolSelect = (symbol: string) => {
        //TODO
    };
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
            <VStack>
                <PhoneticKeyboard onSymbolSelect={onSymbolSelect} />
                <HStack>
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
                    <Text fontSize="3xl">{wordAndTranscription.word}</Text>
                </HStack>
            </VStack>

            <HStack gap={1}>
                <Field.Root w="fit-content">
                    <Field.Label fontSize="xs" color="gray">
                        Transcrição fonética
                    </Field.Label>
                    <Input size="xs" />
                </Field.Root>
            </HStack>
        </HStack>
    );
};

export default PhoneticInputCell;
