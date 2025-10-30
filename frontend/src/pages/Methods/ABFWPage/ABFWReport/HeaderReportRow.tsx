import { Box, Grid } from "@chakra-ui/react";

const HeaderReportRow = () => {
    return (
        <Grid
            templateColumns="auto 1fr auto"
            border="1px solid"
            borderColor="gray.300"
            bg="gray.700"
            width="350px"
            fontWeight="bold"
            color="white"
        >
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
                width="100px"
            >
                FONEMA
            </Box>
            <Box
                p={2}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
                width="150px"
            >
                TRANSCRIÇÃO
            </Box>
            <Box p={2} textAlign="center" width="100px">
                PCC
            </Box>
        </Grid>
    );
};

export default HeaderReportRow;
