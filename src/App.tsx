import React from 'react';
import './App.css';
import {
    Box,
    Button,
    Container, Divider,
    Grid,
    GridItem,
    Heading,
    Radio,
    RadioGroup,
    Spacer,
    Spinner, Stack, StackDivider,
    Text
} from "@chakra-ui/react";

function App() {
    const fs = {base: 'sm', md: 'lg', lg: 'xl'};
    return (
        <Box h={"100vh"} display={"flex"} flexDir={"column"}>
            <Box
                as="aside"
                bg={"gray.500"}>
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
                    bg={"purple.700"}
                    colSpan={{base: 6, md: 4}}
                    p={5}>
                    <Text>Spectrogram here</Text>
                </GridItem>
                <GridItem
                    colSpan={{base: 6, md: 2}}
                    bg={"gray.600"} p={5}>
                    <Button colorScheme='teal' variant='outline'>
                        Start Recording
                    </Button>
                    <Text>Perspective</Text>
                    <RadioGroup defaultValue='2' m={2}>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='red' value='1'>
                                3D
                            </Radio>
                            <Radio colorScheme='green' value='2'>
                                2D
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Text>Frequency Scale</Text>
                    <RadioGroup defaultValue='2' m={2}>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='red' value='1'>
                                Logarithmic
                            </Radio>
                            <Radio colorScheme='green' value='2'>
                                Linear
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Text>Frequency Resolution</Text>
                    <Text>Time Resolution</Text>
                    <Text>Time Samples Overlap</Text>
                    <Text>Window Function</Text>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default App;
