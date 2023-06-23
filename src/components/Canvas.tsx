import {Box, Button, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {SettingsState} from "../types/SettingsState";

const FFT = require('fft.js');

function padArray(array: number[], length: number, fill: number) {
    return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: ScriptProcessorNode | null }) {
    const [remainder, setRemainder] = useState(Array<number>());

    const processChunk = (chunk: number[]) => {
        const f = new FFT(8192);
        let input = padArray(chunk, f.size, 0);
        let out = new Array(f.size);
        f.realTransform(out, input);
        console.log(out);
    }

    if (recorder != null) {
        console.log("Assigning event");
        recorder.onaudioprocess = (event) => {
            const samples = Array.from(event.inputBuffer.getChannelData(0));
            const data = [...remainder, ...samples];

            // Calculate how many full chunks can be taken from data
            let numFullChunks = Math.floor(data.length / settings.timeResolution);

            // Add full chunks to the queue
            for (let i = 0; i < numFullChunks; i++) {
                let chunk = data.slice(i * settings.timeResolution, (i + 1) * settings.timeResolution);
                processChunk(chunk);
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