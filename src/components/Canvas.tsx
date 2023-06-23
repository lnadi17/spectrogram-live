import {Box, Button, Text, useCallbackRef} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SettingsState} from "../types/SettingsState";

const FFT = require('fft.js');

function padArray(array: number[], length: number, fill: number) {
    return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

function plotSpectrogram(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, settings: SettingsState) {
    let fftSize = 8192;
    canvasCtx.lineWidth = 1;
    canvasCtx.fillStyle = 'white';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
}


function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: ScriptProcessorNode | null }) {
    // console.log("Rendering Canvas");
    const remainder = useRef(Array<number>());
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);

    const callbackRef = useCallbackRef((node) => {
        if (node != null) {
            console.log("Updating canvas and canvasCtx refs");
            canvas.current = node;
            canvasCtx.current = node.getContext("2d", {willReadFrequently: true});
        }
    }, [])

    const processChunk = useCallback((chunk: number[]) => {
        const f = new FFT(8192);
        let input = padArray(chunk, f.size, 0);
        let out = new Array(f.size);
        f.realTransform(out, input);
        if (canvas.current != null && canvasCtx.current != null) {
            plotSpectrogram(canvas.current, canvasCtx.current, settings);
        }
        // console.log(out);
    }, []);

    useEffect(() => {
        if (recorder != null) {
            console.log("Assigning audio process event");
            recorder.onaudioprocess = (event) => {
                const samples = Array.from(event.inputBuffer.getChannelData(0));
                const data = [...remainder.current, ...samples];

                // Calculate how many full chunks can be taken from data
                let numFullChunks = Math.floor(data.length / settings.timeResolution);

                // Add full chunks to the queue
                for (let i = 0; i < numFullChunks; i++) {
                    let chunk = data.slice(i * settings.timeResolution, (i + 1) * settings.timeResolution);
                    processChunk(chunk);
                }

                // Store any remaining data to be used next time
                remainder.current = data.slice(numFullChunks * settings.timeResolution); //
            }
        }
    }, [recorder, settings]);

    return (
        <Box height={"100%"}>
            {/*<Text>Spectrogram here</Text>*/}
            {/*<Text>{recorder !== null ? "Recording In Progress" : "Not Recording"}</Text>*/}
            <canvas ref={callbackRef} style={{
                border: "1px solid black",
                position: "relative",
                inset: 0,
                minHeight: "33vh",
                height: "100%",
                width: "100%"
            }}></canvas>
        </Box>
    );
}

export default Canvas;