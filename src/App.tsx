import React, {useEffect, useState} from 'react';
import './App.css';
import {Flex, Grid, GridItem} from "@chakra-ui/react";

import Canvas from "./components/Canvas";
import Header from "./components/Header";
import {Settings} from "./components/Settings";
import {SettingsState} from "./types/SettingsState";
import {WindowFunction} from "./types/WindowFunction";

const windowFunctions : Array<WindowFunction> = [
    {
        name: "Rectangular",
        values: (t: [number]) => {
            return Array(t.length).fill(1) as [number];
        }
    },
    {
        name: "Hanning",
        values: (t: [number]) => {
            return Array(t.length).fill(1) as [number];
        }
    },
    {
        name: "Hamming",
        values: (t: [number]) => {
            return Array(t.length).fill(1) as [number];
        }
    }
];

function App() {
    const initialSettingsState: SettingsState = {
        freqResolution: 0,
        timeResolution: 200,
        timeSamplesOverlap: 0,
        sampleRate: 8000,
        minTimeResolution: 200,
        maxTimeResolution: 8000,
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
                    <Settings settings={settingsState} recorder={recorder} settingsSetter={setSettingsState} recorderSetter={setRecorder}/>
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default App;
