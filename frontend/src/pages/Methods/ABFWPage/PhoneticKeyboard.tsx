import React from "react";
import { Box, Button, Grid, Text, VStack } from "@chakra-ui/react";
import {
    PopoverRoot,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseTrigger,
} from "@chakra-ui/react";

interface Props {
    onSymbolSelect: (symbol: string) => void;
}

const PhoneticKeyboard = ({ onSymbolSelect }: Props) => {
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
        onSymbolSelect(symbol);
    };

    return (
        <PopoverRoot
            positioning={{
                strategy: "fixed",
                placement: "bottom-start",
                flip: true,
                shift: 8,
            }}
        >
            <PopoverTrigger>
                <Button size="xs" variant="outline" colorScheme="blue">
                    Teclado IPA
                </Button>
            </PopoverTrigger>
            <PopoverContent
                width="320px"
                maxHeight="400px"
                overflow="auto"
                zIndex={9999}
                boxShadow="lg"
                position="fixed"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
            >
                <PopoverHeader py={2}>
                    <Text fontWeight="bold" fontSize="sm">
                        IPA Symbols
                    </Text>
                </PopoverHeader>
                <PopoverCloseTrigger />
                <PopoverBody py={2}>
                    <VStack gap={3} align="stretch">
                        <Box>
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                mb={2}
                                color="gray.600"
                            >
                                Consonants
                            </Text>
                            <Grid templateColumns="repeat(8, 1fr)" gap={1}>
                                {consonants.map((symbol) => (
                                    <Button
                                        key={symbol}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() =>
                                            handleSymbolClick(symbol)
                                        }
                                        _hover={{ bg: "blue.50" }}
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

                        <Box>
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                mb={2}
                                color="gray.600"
                            >
                                Vowels
                            </Text>
                            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                                {vowels.map((symbol) => (
                                    <Button
                                        key={symbol}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() =>
                                            handleSymbolClick(symbol)
                                        }
                                        _hover={{ bg: "blue.50" }}
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

                        <Box>
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                mb={2}
                                color="gray.600"
                            >
                                Diacritics & Suprasegmentals
                            </Text>
                            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
                                {diacritics.map((symbol) => (
                                    <Button
                                        key={symbol}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() =>
                                            handleSymbolClick(symbol)
                                        }
                                        _hover={{ bg: "blue.50" }}
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
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
};

export default PhoneticKeyboard;
