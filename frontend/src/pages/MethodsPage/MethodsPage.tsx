import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const MethodsPage = () => {
    const navigate = useNavigate();
    const methodsAvailable = [
        { label: "ABFW", description: "description", to: "/methods/abfw" },
    ];
    return (
        <Flex>
            {methodsAvailable.map((method) => (
                <Box
                    key={method.label}
                    maxW="sm"
                    m={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
                >
                    <Box p={6}>
                        <Heading size="md" mb={2}>
                            {method.label.toUpperCase()} Method
                        </Heading>
                        <Text>{method.description}</Text>
                    </Box>
                    <Box p={6} pt={0}>
                        <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => navigate(method.to)}
                        >
                            Gerar Avaliação
                        </Button>
                    </Box>
                </Box>
            ))}
        </Flex>
    );
};

export default MethodsPage;
