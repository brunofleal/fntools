import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    SimpleGrid,
    Icon,
    Flex,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { FaRocket, FaUsers, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Box minH="100vh" bg="gray.50">
            {/* Hero Section */}
            <Container maxW="7xl" py={20}>
                <Button
                    size="lg"
                    colorScheme="white"
                    variant="solid"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
                <VStack gap={8} textAlign="center">
                    <Heading
                        as="h1"
                        size="2xl"
                        bgGradient="linear(to-r, blue.400, purple.500)"
                        bgClip="text"
                        fontWeight="bold"
                    >
                        Bem-vindo ao ParaFono
                    </Heading>
                    <Text fontSize="xl" color="gray.600" maxW="2xl">
                        Automatize a análise fonológica dos seus pacientes com
                        tecnologia avançada de processamento de linguagem
                        natural. Transforme transcrições de fala em relatórios
                        detalhados.
                    </Text>
                    <Stack direction={["column", "row"]} gap={4}>
                        <Button colorScheme="purple" size="lg">
                            Começar Agora
                        </Button>
                        <Button variant="outline" size="lg">
                            Saiba Mais
                        </Button>
                    </Stack>
                </VStack>
            </Container>

            {/* Features Section */}
            <Container maxW="7xl" py={16}>
                <VStack gap={12}>
                    <Heading as="h2" size="xl" textAlign="center">
                        Por que escolher o ParaFono?
                    </Heading>
                    <SimpleGrid columns={[1, null, 3]} gap={8}>
                        <Box
                            bg="white"
                            p={8}
                            rounded="lg"
                            shadow="md"
                            textAlign="center"
                        >
                            <Icon
                                as={FaRocket}
                                boxSize={12}
                                color="blue.500"
                                mb={4}
                            />
                            <Heading as="h3" size="md" mb={4}>
                                Processamento Automático
                            </Heading>
                            <Text color="gray.600">
                                Nossos algoritmos de processamento de linguagem
                                natural analisam transcrições fonéticas e
                                identificam processos fonológicos de forma
                                precisa e consistente.
                            </Text>
                        </Box>
                        <Box
                            bg="white"
                            p={8}
                            rounded="lg"
                            shadow="md"
                            textAlign="center"
                        >
                            <Icon
                                as={FaUsers}
                                boxSize={12}
                                color="purple.500"
                                mb={4}
                            />
                            <Heading as="h3" size="md" mb={4}>
                                Relatórios Estruturados
                            </Heading>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Container>

            {/* How it Works Section */}
            <Box bg="white" py={16}>
                <Container maxW="7xl">
                    <VStack gap={12}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Como funciona o processamento
                        </Heading>
                        <SimpleGrid columns={[1, null, 3]} gap={8}>
                            <VStack textAlign="center" gap={4}>
                                <Box
                                    bg="purple.100"
                                    rounded="full"
                                    w={16}
                                    h={16}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="purple.600"
                                >
                                    1
                                </Box>
                                <Heading as="h3" size="md">
                                    Inserção da transcrição
                                </Heading>
                                <Text color="gray.600" textAlign="center">
                                    Cole ou digite a transcrição fonética da
                                    fala do paciente utilizando o Alfabeto
                                    Fonético Internacional (AFI)
                                </Text>
                            </VStack>
                            <VStack textAlign="center" gap={4}>
                                <Box
                                    bg="purple.100"
                                    rounded="full"
                                    w={16}
                                    h={16}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="purple.600"
                                >
                                    2
                                </Box>
                                <Heading as="h3" size="md">
                                    Análise computacional
                                </Heading>
                                <Text color="gray.600" textAlign="center">
                                    Algoritmos de processamento de linguagem
                                    natural identificam segmentos fonéticos,
                                    comparam com padrões alvo e calculam
                                    percentuais.
                                </Text>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Technical Features Section */}
            <Container maxW="7xl" py={16}>
                <VStack gap={12}>
                    <Heading as="h2" size="xl" textAlign="center">
                        Recursos técnicos
                    </Heading>
                    <SimpleGrid columns={[1, 2]} gap={8}>
                        <Box bg="white" p={6} rounded="lg" shadow="md">
                            <Heading
                                as="h3"
                                size="md"
                                mb={4}
                                color="purple.600"
                            >
                                Processamento de linguagem natural
                            </Heading>
                            <Text color="gray.600">
                                Utiliza técnicas avançadas de análise textual
                                para identificar padrões fonológicos,
                                substituições, omissões e distorções em
                                transcrições de fala.
                            </Text>
                        </Box>
                        <Box bg="white" p={6} rounded="lg" shadow="md">
                            <Heading
                                as="h3"
                                size="md"
                                mb={4}
                                color="purple.600"
                            >
                                Algoritmos de comparação
                            </Heading>
                            <Text color="gray.600">
                                Compara automaticamente produções do paciente
                                com formas-alvo esperadas, identificando desvios
                                e classificando processos fonológicos.
                            </Text>
                        </Box>
                        <Box bg="white" p={6} rounded="lg" shadow="md">
                            <Heading
                                as="h3"
                                size="md"
                                mb={4}
                                color="purple.600"
                            >
                                Base de conhecimento linguístico
                            </Heading>
                            <Text color="gray.600">
                                Fundamentado em teorias fonológicas consolidadas
                                e padrões de desenvolvimento típico da linguagem
                                para análises precisas.
                            </Text>
                        </Box>
                        <Box bg="white" p={6} rounded="lg" shadow="md">
                            <Heading
                                as="h3"
                                size="md"
                                mb={4}
                                color="purple.600"
                            >
                                Visualização de dados
                            </Heading>
                            <Text color="gray.600">
                                Gráficos e tabelas interativas facilitam a
                                interpretação dos resultados e o acompanhamento
                                da evolução terapêutica.
                            </Text>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Container>

            {/* CTA Section */}
            <Box bg="purple.500" py={16}>
                <Container maxW="4xl">
                    <VStack gap={6} textAlign="center">
                        <Heading as="h2" size="xl" color="white">
                            Pronto para começar?
                        </Heading>
                        <Text fontSize="lg" color="blue.100" maxW="2xl">
                            Simplifique sua rotina profissional com ferramentas
                            automatizadas de análise fonológica desenvolvidas
                            especificamente para fonoaudiólogos.
                        </Text>
                        <Button
                            size="lg"
                            colorScheme="white"
                            variant="solid"
                            onClick={() => navigate("/register")}
                        >
                            Crie sua conta
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
