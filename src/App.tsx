import React from 'react';
import './App.css';
import {Box, Container, Grid, GridItem, Heading, Spacer, Spinner, Text} from "@chakra-ui/react";

function App() {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" h={"100%"}>
            <GridItem
                as="aside"
                bg={"gray.500"}
                colSpan={6}
                h={"20vh"}>
                <Heading as="h1" m={2} color={"blue.50"}>Spectrogram Live</Heading>
                <Text ml={3} color={"blue.100"}>A web application developed by Luka Nadiradze during the Digital Signal
                    Processing course.</Text>
                <Text ml={3} mb={1} color={"blue.100"}>Record the sound from your microphone and see what frequencies the
                    sound consists of.</Text>
            </GridItem>
            <GridItem
                as="main"
                bg={"purple.700"}
                colSpan={4}>
                <Box height="80vh" display="flex" flexDirection="column">
                    <Text>Spectrogram here</Text>
                </Box>
            </GridItem>
            <GridItem
                as={"aside"}
                colSpan={2}
                bg={"gray.600"}>
                <Text>Settings Here</Text>
            </GridItem>
        </Grid>
    );
}

export default App;
