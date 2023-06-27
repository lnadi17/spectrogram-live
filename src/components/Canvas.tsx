import {Box, Button, Text, useCallbackRef} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SettingsState} from "../types/SettingsState";
import {DFT} from "../scripts/DFT";

function plotSpectrogram(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, settings: SettingsState, fft: number[]) {
    const fftSize = fft.length;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    canvasCtx.lineWidth = 1;

    const widthMultiplier = 2;
    const xBinWidth = Math.floor(settings.timeResolution / settings.minTimeResolution) * widthMultiplier;
    // const timeWidth = canvasWidth / xBinWidth * settings.timeResolution / settings.sampleRate;

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

function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: ScriptProcessorNode | null }) {
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
        const f = new DFT();
        const out = [...f.computeDFT(chunk)];
        if (canvas.current != null && canvasCtx.current != null) {
            requestAnimationFrame(() => plotSpectrogram(canvas.current!, canvasCtx.current!, settings, out))
        }
    }, [settings]);

    useEffect(() => {
        if (recorder != null) {
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