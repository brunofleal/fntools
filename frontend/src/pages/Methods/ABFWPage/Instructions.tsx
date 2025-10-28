import {
    Box,
    Button,
    Circle,
    HStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const Instructions = () => {
    const { open, onToggle } = useDisclosure();

    return (
        <Box p={4}>
            <HStack>
                <Text color="gray.600" mb={4}>
                    O ABFW (Avaliação Fonológica da Criança) é uma ferramenta
                    abrangente de avaliação fonológica projetada para avaliar o
                    desenvolvimento dos sons da fala em crianças. Por favor,
                    siga os procedimentos padronizados para obter resultados
                    precisos.
                </Text>
                <Button onClick={onToggle} colorScheme="blue" size="sm" mb={3}>
                    {open ? "Ocultar Instruções" : "Mostrar Instruções"}
                </Button>
            </HStack>

            <Box mb={4}>
                {open && (
                    <Box
                        bg="blue.50"
                        border="1px"
                        borderColor="blue.200"
                        borderRadius="md"
                        p={4}
                        mb={4}
                    >
                        <Box>
                            <Text fontWeight="bold" mb={4} color="blue.800">
                                Como completar a avaliação ABFW:
                            </Text>
                            <Box
                                display="flex"
                                flexDirection="row"
                                gap={6}
                                overflowX="auto"
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    minWidth="200px"
                                >
                                    <Circle
                                        size="32px"
                                        bg="blue.500"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        1
                                    </Circle>
                                    <Text
                                        fontSize="sm"
                                        color="blue.700"
                                        textAlign="center"
                                    >
                                        Apresente à criança figuras ou objetos
                                        para nomeação espontânea
                                    </Text>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    minWidth="200px"
                                >
                                    <Circle
                                        size="32px"
                                        bg="blue.500"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        2
                                    </Circle>
                                    <Text
                                        fontSize="sm"
                                        color="blue.700"
                                        textAlign="center"
                                    >
                                        Registre a pronúncia da criança de cada
                                        palavra-alvo
                                    </Text>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    minWidth="200px"
                                >
                                    <Circle
                                        size="32px"
                                        bg="blue.500"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        3
                                    </Circle>
                                    <Text
                                        fontSize="sm"
                                        color="blue.700"
                                        textAlign="center"
                                    >
                                        Anote qualquer processo fonológico ou
                                        substituições de sons
                                    </Text>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    minWidth="200px"
                                >
                                    <Circle
                                        size="32px"
                                        bg="blue.500"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        4
                                    </Circle>
                                    <Text
                                        fontSize="sm"
                                        color="blue.700"
                                        textAlign="center"
                                    >
                                        Complete o formulário de pontuação
                                        baseado nas respostas da criança
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Instructions;
