import { Box, Alert } from "@chakra-ui/react";

const OnboardPage = () => {
    return (
        <Box>
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Conta criada com sucesso</Alert.Title>
            </Alert.Root>
            <Alert.Root status="info">
                <Alert.Indicator />
                <Alert.Title>
                    Para começar a usar a aplicação, é preciso pagar a
                    mensalidade
                </Alert.Title>
            </Alert.Root>
        </Box>
    );
};

export default OnboardPage;
