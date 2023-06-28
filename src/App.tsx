import React, {useState} from 'react';
import './App.css';
import {Flex, Grid, GridItem} from "@chakra-ui/react";

import Canvas from "./components/Canvas";
import Header from "./components/Header";
import {Settings} from "./components/Settings";
import {SettingsState} from "./types/SettingsState";
import {windowFunctions} from "./scripts/WindowFunctions";

function App() {
    const initialSettingsState: SettingsState = {
        freqResolution: 0,
        timeResolution: 1500,
        timeSamplesOverlap: 750,
        sampleRate: 8000,
        minTimeResolution: 200,
        maxTimeResolution: 8000,
        minFrequency: 0,
        maxFrequency: 10000,
        minDB: -40,
        intensityScale: 'dB',
        freqScale: 'Mel',
        cmapChoice: 'viridis',
        cmapChoices: ['Blues_r', 'bone', 'coolwarm', 'cividis', 'plasma', 'viridis', 'Greys_r', 'hot', 'seismic', 'summer'],
        window: windowFunctions[0],
        windowFunctions: windowFunctions
    };

    const [settingsState, setSettingsState] = useState(initialSettingsState);
    const [recorder, setRecorder] = useState(null);

    return (
        <Flex h={"100vh"} direction={"column"}>
            <Header/>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" flexGrow={1}>
                <GridItem bg={"gray.700"} colSpan={{base: 6, md: 4}} p={5}>
                    <Canvas settings={settingsState} recorder={recorder}/>
                </GridItem>
                <GridItem colSpan={{base: 6, md: 2}} bg={"gray.600"} p={5} overflowY={{base: "hidden", md: "scroll"}}
                          maxH={{base: 'none', md: '80vh'}}>
                    <Settings settings={settingsState} recorder={recorder} settingsSetter={setSettingsState}
                              recorderSetter={setRecorder}/>
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default App;
