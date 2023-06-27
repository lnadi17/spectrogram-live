import React, {useEffect, useState} from 'react';
import './App.css';
import {Flex, Grid, GridItem} from "@chakra-ui/react";

import Canvas from "./components/Canvas";
import Header from "./components/Header";
import {Settings} from "./components/Settings";
import {SettingsState} from "./types/SettingsState";
import {WindowFunction} from "./types/WindowFunction";
import {windowFunctions} from "./scripts/WindowFunctions";

function App() {
    const initialSettingsState: SettingsState = {
        freqResolution: 0,
        timeResolution: 1000,
        timeSamplesOverlap: 100,
        sampleRate: 8000,
        minTimeResolution: 200,
        maxTimeResolution: 8000,
        minFrequency: 100,
        maxFrequency: 3000,
        minDB: -20,
        sensitivity: null,
        window: windowFunctions[0],
        windowFunctions: windowFunctions
    };

    const [settingsState, setSettingsState] = useState(initialSettingsState);
    const [recorder, setRecorder] = useState(null);

    return (
        <Flex h={"100vh"} direction={"column"}>
            <Header/>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" flexGrow={1}>
                <GridItem bg={"purple.700"} colSpan={{base: 6, md: 4}} p={5}>
                    <Canvas settings={settingsState} recorder={recorder}/>
                </GridItem>
                <GridItem colSpan={{base: 6, md: 2}} bg={"gray.600"} p={5}>
                    <Settings settings={settingsState} recorder={recorder} settingsSetter={setSettingsState}
                              recorderSetter={setRecorder}/>
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default App;
