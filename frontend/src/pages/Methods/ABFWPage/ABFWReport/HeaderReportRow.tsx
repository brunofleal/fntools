import { Box, Grid } from "@chakra-ui/react";

const HeaderReportRow = () => {
    return (
        <Grid
            templateColumns="80px 1fr 1fr 120px"
            border="1px solid"
            borderColor="gray.300"
            bg="gray.700"
            fontWeight="bold"
            color="white"
        >
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                FONEMA
            </Box>
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                PALAVRA
            </Box>
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                TRANSCRIÇÃO
            </Box>
            <Box p={2} textAlign="center">
                PCC
            </Box>
        </Grid>
    );
};

export default HeaderReportRow;
