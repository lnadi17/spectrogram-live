import React from 'react';
import './App.css';
import {
    Box,
    Button,
    Container, Divider, Flex,
    Grid,
    GridItem,
    Heading,
    Radio,
    RadioGroup,
    Spacer,
    Spinner, Stack, StackDivider,
    Text, useBreakpointValue
} from "@chakra-ui/react";

import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Settings from "./components/Settings";


function App() {
    return (
        <Flex h={"100vh"} direction={"column"}>
            <Header/>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" flexGrow={1}>
                <GridItem bg={"purple.700"} colSpan={{base: 6, md: 4}} p={5}>
                    <Canvas/>
                </GridItem>
                <GridItem colSpan={{base: 6, md: 2}} bg={"gray.600"} p={5}>
                    <Settings/>
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default App;
