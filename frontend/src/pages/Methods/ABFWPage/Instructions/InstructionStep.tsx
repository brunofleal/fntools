import { Box, Circle, Text } from "@chakra-ui/react";

interface Props {
    stepNumber: number;
    description: string;
}

const InstructionStep = ({ stepNumber, description }: Props) => {
    return (
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
                {stepNumber}
            </Circle>
            <Text fontSize="sm" textAlign="center">
                {description}
            </Text>
        </Box>
    );
};

export default InstructionStep;
