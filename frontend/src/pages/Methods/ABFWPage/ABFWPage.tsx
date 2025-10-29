import { Box, Flex, Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import Instructions from "./Instructions";
import { wordsImitation, wordsNomeation } from "./words";
import PhoneticInputCell from "./PhoneticInputCell";
import PhoneticKeyboard from "./PhoneticKeyboard";

const ABFWPage = () => {
    return (
        <Box p={4} maxHeight="86vh" overflowY="auto">
            <Instructions />
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
                    base: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                }}
                gap={4}
            >
                {wordsImitation.map((word, index) => {
                    return (
                        <GridItem key={word.word}>
                            <PhoneticInputCell
                                index={index}
                                wordAndTranscription={word}
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
                    base: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                }}
                gap={4}
            >
                {wordsNomeation.map((word, index) => {
                    return (
                        <GridItem key={word.word}>
                            <PhoneticInputCell
                                index={index}
                                wordAndTranscription={word}
                            />
                        </GridItem>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ABFWPage;
