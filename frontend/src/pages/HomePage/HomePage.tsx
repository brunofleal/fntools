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
                        A solução completa para fonoaudiólogos gerarem
                        relatórios e realizarem análises de dados de forma
                        eficiente e profissional.
                    </Text>
                    <Stack direction={["column", "row"]} gap={4}>
                        <Button colorScheme="blue" size="lg">
                            Começar Agora 🚀
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
                                Rápido & Eficiente
                            </Heading>
                            <Text color="gray.600">
                                Gere relatórios fonoaudiológicos com velocidade
                                e precisão, otimizando seu tempo para focar no
                                que mais importa: seus pacientes.
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
                                color="green.500"
                                mb={4}
                            />
                            <Heading as="h3" size="md" mb={4}>
                                Análise de Dados
                            </Heading>
                            <Text color="gray.600">
                                Transforme dados em insights valiosos com
                                ferramentas de análise avançadas para acompanhar
                                o progresso dos seus pacientes.
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
                                as={FaShieldAlt}
                                boxSize={12}
                                color="purple.500"
                                mb={4}
                            />
                            <Heading as="h3" size="md" mb={4}>
                                Seguro & Confiável
                            </Heading>
                            <Text color="gray.600">
                                Seus dados e os de seus pacientes estão
                                protegidos com segurança de nível hospitalar e
                                99,9% de disponibilidade.
                            </Text>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Container>

            {/* CTA Section */}
            <Box bg="blue.500" py={16}>
                <Container maxW="4xl">
                    <VStack gap={6} textAlign="center">
                        <Heading as="h2" size="xl" color="white">
                            Pronto para começar?
                        </Heading>
                        <Text fontSize="lg" color="blue.100" maxW="2xl">
                            Junte-se a milhares de fonoaudiólogos que já
                            transformaram sua prática profissional com o
                            ParaFono.
                        </Text>
                        <Button
                            size="lg"
                            colorScheme="white"
                            variant="solid"
                            color="blue.500"
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
