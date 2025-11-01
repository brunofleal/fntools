import {
    Box,
    Button,
    Circle,
    HStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import InstructionStep from "./InstructionStep";

const Instructions = () => {
    const { open, onToggle } = useDisclosure();

    return (
        <Box>
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
                        bg="purple.100"
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={4}
                        mb={4}
                    >
                        <Box>
                            <Text fontWeight="bold" mb={4} color="blue.800">
                                Como preencher a avaliação ABFW:
                            </Text>
                            <Box
                                display="flex"
                                flexDirection="row"
                                gap={6}
                                overflowX="auto"
                            >
                                <InstructionStep
                                    stepNumber={1}
                                    description="Preencha o nome/idade do paciente e a data da avaliação"
                                />
                                <InstructionStep
                                    stepNumber={2}
                                    description="Registre a transcrição da pronúncia da criança de cada palavra-alvo"
                                />
                                <InstructionStep
                                    stepNumber={3}
                                    description="Determine os fonemas corretos de cada transcrição, verde significa correto e vermelho significa incorreto."
                                />
                                <InstructionStep
                                    stepNumber={4}
                                    description="Confirme a geração do relatório e confira os resultados"
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Instructions;
