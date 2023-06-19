import React from 'react';
import './App.css';
import {Box, Container, Grid, GridItem, Heading, Spacer, Spinner, Text} from "@chakra-ui/react";

function App() {
    const fs = {base: 'sm', md: 'lg', lg: 'xl'};
    return (
        <Box h={"100vh"} display={"flex"} flexDir={"column"}>
            <Box
                as="aside"
                bg={"gray.500"}
                w={"100vw"}>
                <Heading m={2} color={"blue.50"}>Spectrogram Live</Heading>
                <Text ml={3} color={"blue.100"} fontSize={fs}>A web application developed by Luka Nadiradze during
                    the Digital Signal
                    Processing course.</Text>
                <Text ml={3} mb={1} color={"blue.100"} fontSize={fs}>Record the sound from your microphone and see
                    what frequencies the
                    sound consists of.</Text>
            </Box>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" flexGrow={1}>
                <GridItem
                    as="main"
                    bg={"purple.700"}
                    colSpan={{base: 6, md: 4}}>
                    <Text>Spectrogram here</Text>
                </GridItem>
                <GridItem
                    as={"aside"}
                    colSpan={{base: 6, md: 2}}
                    bg={"gray.600"}>
                    <Text>Settings Here</Text>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default App;
