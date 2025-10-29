import React, { useState, useRef, JSX } from "react";
import {
    Box,
    Button,
    Grid,
    Text,
    VStack,
    Portal,
    HStack,
    Input,
} from "@chakra-ui/react";
import { BsEraser, BsKeyboard } from "react-icons/bs";

interface Props {
    currentTranscription: string;
    setTranscription: (symbol: string) => void;
    children?: JSX.Element;
}

const PhoneticKeyboard = ({
    currentTranscription,
    setTranscription,
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Common IPA symbols organized by category
    const consonants = [
        "p",
        "b",
        "t",
        "d",
        "k",
        "g",
        "ʔ",
        "f",
        "v",
        "θ",
        "ð",
        "s",
        "z",
        "ʃ",
        "ʒ",
        "h",
        "m",
        "n",
        "ŋ",
        "l",
        "r",
        "ɹ",
        "w",
        "j",
        "tʃ",
        "dʒ",
        "ts",
        "dz",
    ];

    const vowels = [
        "i",
        "ɪ",
        "e",
        "ɛ",
        "æ",
        "a",
        "ɑ",
        "ɔ",
        "o",
        "ʊ",
        "u",
        "ɨ",
        "ə",
        "ɚ",
        "ɝ",
        "ʌ",
        "ɒ",
    ];

    const diacritics = ["ˈ", "ˌ", ":", "ʰ", "ʷ", "ʲ", "ⁿ", "̃", "̥", "̬"];

    const handleSymbolClick = (symbol: string) => {
        setTranscription(currentTranscription + symbol);
    };

    const handleErase = () => {
        setTranscription("");
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Button
                ref={buttonRef}
                size="xs"
                variant="outline"
                colorScheme="blue"
                onClick={handleToggle}
            >
                <BsKeyboard />
            </Button>

            {isOpen && (
                <Portal>
                    <Box
                        position="fixed"
                        bottom="25%"
                        left="50%"
                        transform="translateX(-50%)"
                        width="320px"
                        maxHeight="400px"
                        overflow="auto"
                        zIndex={9999}
                        boxShadow="lg"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={3}
                    >
                        <VStack gap={3} align="stretch">
                            <HStack justify="space-between" align="flex-start">
                                {children}
                                <VStack w="200px">
                                    <Text color="gray.600" fontSize="xs">
                                        Transcrição Fonética
                                    </Text>
                                    <HStack>
                                        <Input
                                            size="xs"
                                            value={currentTranscription}
                                            onChange={(e) =>
                                                setTranscription(e.target.value)
                                            }
                                        />
                                        <Button
                                            size={"xs"}
                                            onClick={handleErase}
                                        >
                                            <BsEraser />
                                        </Button>
                                    </HStack>
                                </VStack>
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </HStack>

                            <HStack gap={4} align="flex-start">
                                <Box flex="1">
                                    <Text
                                        fontSize="sm"
                                        fontWeight="semibold"
                                        mb={2}
                                        color="gray.600"
                                    >
                                        Consoantes
                                    </Text>
                                    <Grid
                                        templateColumns="repeat(6, 1fr)"
                                        gap={1}
                                    >
                                        {consonants.map((symbol) => (
                                            <Button
                                                key={symbol}
                                                size="xs"
                                                variant="solid"
                                                onClick={() =>
                                                    handleSymbolClick(symbol)
                                                }
                                                _hover={{ bg: "gray.400" }}
                                                fontFamily="serif"
                                                fontSize="xs"
                                                minW="24px"
                                                h="24px"
                                            >
                                                {symbol}
                                            </Button>
                                        ))}
                                    </Grid>
                                </Box>

                                <Box flex="1">
                                    <Text
                                        fontSize="sm"
                                        fontWeight="semibold"
                                        mb={2}
                                        color="gray.600"
                                    >
                                        Vogais
                                    </Text>
                                    <Grid
                                        templateColumns="repeat(4, 1fr)"
                                        gap={1}
                                    >
                                        {vowels.map((symbol) => (
                                            <Button
                                                key={symbol}
                                                size="xs"
                                                variant="solid"
                                                onClick={() =>
                                                    handleSymbolClick(symbol)
                                                }
                                                _hover={{ bg: "gray.400" }}
                                                fontFamily="serif"
                                                fontSize="xs"
                                                minW="24px"
                                                h="24px"
                                            >
                                                {symbol}
                                            </Button>
                                        ))}
                                    </Grid>
                                </Box>
                            </HStack>

                            <Box>
                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    mb={2}
                                    color="gray.600"
                                >
                                    Diacríticos e Suprassegmentais
                                </Text>
                                <Grid templateColumns="repeat(5, 1fr)" gap={1}>
                                    {diacritics.map((symbol) => (
                                        <Button
                                            key={symbol}
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                handleSymbolClick(symbol)
                                            }
                                            _hover={{ bg: "gray.400" }}
                                            fontFamily="serif"
                                            fontSize="xs"
                                            minW="24px"
                                            h="24px"
                                        >
                                            {symbol}
                                        </Button>
                                    ))}
                                </Grid>
                            </Box>
                        </VStack>
                    </Box>
                </Portal>
            )}
        </>
    );
};

export default PhoneticKeyboard;
