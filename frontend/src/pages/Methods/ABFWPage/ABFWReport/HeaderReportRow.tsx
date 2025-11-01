import { Box, Grid } from "@chakra-ui/react";

const HeaderReportRow = () => {
    return (
        <Grid
            templateColumns={{
                base: "50px 0.8fr 0.8fr 70px",
                sm: "60px 1fr 1fr 90px",
                md: "80px 1fr 1fr 120px",
            }}
            border="1px solid"
            borderColor="gray.300"
            bg="gray.700"
            fontWeight="bold"
            color="white"
            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
        >
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                FONEMA
            </Box>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                PALAVRA
            </Box>
            <Box
                p={{ base: 0.5, sm: 1, md: 2 }}
                borderRight="1px solid"
                borderColor="gray.300"
                textAlign="center"
            >
                TRANSCRIÇÃO
            </Box>
            <Box p={{ base: 0.5, sm: 1, md: 2 }} textAlign="center">
                PCC
            </Box>
        </Grid>
    );
};

export default HeaderReportRow;
