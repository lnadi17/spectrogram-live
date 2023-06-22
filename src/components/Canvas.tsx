import {Box, Button, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {SettingsState} from "../types/SettingsState";
import {Queue} from '@datastructures-js/queue';


function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: ScriptProcessorNode | null }) {
    const [chunks, setChunks] = useState(new Queue<Array<number>>());
    const [remainder, setRemainder] = useState(Array<number>());

    if (recorder != null) {
        recorder.onaudioprocess = (event) => {
            const samples = event.inputBuffer.getChannelData(0);
            const data = [...remainder, ...Array.from(samples)];

            // Calculate how many full chunks can be taken from data
            let numFullChunks = Math.floor(data.length / settings.timeResolution);

            // Add full chunks to the queue
            for (let i = 0; i < numFullChunks; i++) {
                let chunk = data.slice(i * settings.timeResolution, (i + 1) * settings.timeResolution);
                console.log(chunk);
            }

            // Store any remaining data to be used next time
            setRemainder(data.slice(numFullChunks * settings.timeResolution));
        }
    }
    return (
        <Box minH={"33vh"}>
            <Text>Spectrogram here</Text>
            <Text>{recorder !== null ? "Recording In Progress" : "Not Recording"}</Text>
        </Box>
    );
}

export default Canvas;