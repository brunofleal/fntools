import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const MethodsPage = () => {
    const navigate = useNavigate();
    const methodsAvailable = [
        {
            label: "Teste de linguagem infantil ABFW",
            description:
                "Avaliação fonológica da criança que analisa o inventário fonético e o sistema fonológico através de provas de imitação e nomeação. Identifica processos fonológicos, calcula o PCC (Percentagem de Consoantes Corretas) e classifica o grau de severidade do transtorno fonológico.",
            to: "/methods/abfw",
        },
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
                            {method.label.toUpperCase()}
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
