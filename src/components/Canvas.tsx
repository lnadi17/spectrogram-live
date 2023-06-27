import {Box, Button, Text, useCallbackRef} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SettingsState} from "../types/SettingsState";

const FFT = require('fft.js');

function padArray(array: number[], length: number, fill: number) {
    return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

function plotSpectrogram(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, settings: SettingsState, fft: number[]) {
    const fftSize = fft.length;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    canvasCtx.lineWidth = 1;

    const timeWidth = 5; // Canvas should have width of past 5 seconds
    const oneSecondLength = canvasWidth / timeWidth; // Length of 1-second window in pixels
    const xBinWidth = oneSecondLength * (settings.timeResolution / settings.sampleRate); // Width of current time frame in pixels

    // Copy current image to the left
    let imgData = canvasCtx.getImageData(xBinWidth, 0, canvasWidth - xBinWidth, canvasHeight);
    canvasCtx.putImageData(imgData, 0, 0);

    for (let y = 0; y <= canvasHeight; y++) {
        const normalizedHeight = (canvasHeight - y) / canvasHeight;
        const fftIndex = Math.floor(fftSize * normalizedHeight);
        const amplitude = fft[fftIndex];
        canvasCtx.strokeStyle = rgbToColorString(amplitude, amplitude, amplitude);
        canvasCtx.beginPath();
        canvasCtx.moveTo(canvasWidth, y);
        canvasCtx.lineTo(canvasWidth - xBinWidth - 5, y);
        canvasCtx.stroke();
    }
}

function rgbToColorString(red: number, green: number, blue: number) {
    const clampedRed = Math.round(red * 255);
    const clampedGreen = Math.round(green * 255);
    const clampedBlue = Math.round(blue * 255);
    return `rgb(${clampedRed}, ${clampedGreen}, ${clampedBlue})`;
}

function complexArrayToAbsolute(complexArray: number[]) {
    const absoluteArray = [];

    for (let i = 0; i < complexArray.length; i += 2) {
        const real = complexArray[i];
        const imaginary = complexArray[i + 1];
        const absoluteValue = Math.sqrt(real * real + imaginary * imaginary);
        absoluteArray.push(absoluteValue);
    }

    return absoluteArray;
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
            canvas.current = node;
            canvasCtx.current = node.getContext("2d", {willReadFrequently: true, opacity: false});
        }
    }, [])

    const processChunk = useCallback((chunk: number[]) => {
        const f = new FFT(8192);
        let input = padArray(chunk, f.size, 0);
        let out = new Array(f.size / 2);
        f.realTransform(out, input);
        out = complexArrayToAbsolute(out);
        if (canvas.current != null && canvasCtx.current != null) {
            requestAnimationFrame(() => plotSpectrogram(canvas.current!, canvasCtx.current!, settings, out))
        }
    }, [settings]);

    useEffect(() => {
        if (recorder != null) {
            console.log("Assigning audio process event");
            recorder.onaudioprocess = (event) => {
                const samples = Array.from(event.inputBuffer.getChannelData(0));
                const data = [...remainder.current, ...samples];

                if (data.length < settings.timeResolution) {
                    remainder.current = data;
                } else {
                    // Calculate how many full chunks can be taken from data
                    let numFullChunks = Math.floor(data.length / settings.timeResolution);

                    for (let i = 0; i < numFullChunks; i++) {
                        let chunk = data.slice(i * settings.timeResolution, (i + 1) * settings.timeResolution);
                        processChunk(chunk);
                    }

                    // Store any remaining data to be used next time
                    remainder.current = data.slice(numFullChunks * settings.timeResolution); //
                }
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