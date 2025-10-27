import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const ABFWPage = () => {
    return (
        <Box
            borderRadius="lg"
            boxShadow="lg"
            bg="gray.50"
            borderColor="gray.200"
            borderWidth="1px"
            p={6}
            m={4}
        >
            <Heading size="lg" mb={4} color="gray.700">
                Instruções do Protocolo ABFW
            </Heading>
            <Box
                bg="blue.50"
                border="1px"
                borderColor="blue.200"
                borderRadius="md"
                p={4}
                mb={4}
            >
                <Box>
                    <Text fontWeight="bold" mb={2} color="blue.800">
                        Como completar a avaliação ABFW:
                    </Text>
                    <Text fontSize="sm" color="blue.700">
                        1. Apresente à criança figuras ou objetos para nomeação
                        espontânea
                    </Text>
                    <Text fontSize="sm" color="blue.700">
                        2. Registre a pronúncia da criança de cada palavra-alvo
                    </Text>
                    <Text fontSize="sm" color="blue.700">
                        3. Anote qualquer processo fonológico ou substituições
                        de sons
                    </Text>
                    <Text fontSize="sm" color="blue.700">
                        4. Complete o formulário de pontuação baseado nas
                        respostas da criança
                    </Text>
                </Box>
            </Box>
            <Text color="gray.600">
                O ABFW (Avaliação Fonológica da Criança) é uma ferramenta
                abrangente de avaliação fonológica projetada para avaliar o
                desenvolvimento dos sons da fala em crianças. Por favor, siga os
                procedimentos padronizados para obter resultados precisos.
            </Text>
        </Box>
    );
};

export default ABFWPage;
