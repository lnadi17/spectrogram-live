import {Box, Button, Text, useCallbackRef} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SettingsState} from "../types/SettingsState";
import {DFT} from "../scripts/DFT";

function plotSpectrogram(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, settings: SettingsState, fft: number[], maxAmplitude: number) {
    const fftSize = fft.length;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    canvasCtx.lineWidth = 1;

    const widthMultiplier = 1;
    const xBinWidth = Math.floor(settings.timeResolution / settings.minTimeResolution) * widthMultiplier;
    // const timeWidth = canvasWidth / xBinWidth * settings.timeResolution / settings.sampleRate;

    // Copy current image to the left
    let imgData = canvasCtx.getImageData(xBinWidth, 0, canvasWidth - xBinWidth, canvasHeight);
    canvasCtx.putImageData(imgData, 0, 0);

    for (let y = 0; y <= canvasHeight; y++) {
        const normalizedHeight = (canvasHeight - y) / canvasHeight;
        const fftIndex = Math.floor(fftSize * normalizedHeight);
        let linearAmplitude = fft[fftIndex] / maxAmplitude;
        let dbAmplitude = 10 * Math.log10(linearAmplitude);
        let dbAmplitudeNorm = (dbAmplitude - settings.minDB) / (0 - settings.minDB);
        canvasCtx.strokeStyle = rgbToColorString(dbAmplitudeNorm, dbAmplitudeNorm, dbAmplitudeNorm);
        canvasCtx.beginPath();
        canvasCtx.moveTo(canvasWidth, y);
        canvasCtx.lineTo(canvasWidth - xBinWidth - 5 * widthMultiplier, y);
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
    const maxAmplitudes = useRef(Array<number>());
    const chunkIndex = useRef<number>(0);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);

    const callbackRef = useCallbackRef((node) => {
        if (node != null) {
            canvas.current = node;
            canvas.current!.width = canvas.current!.width * 4;
            canvas.current!.height = canvas.current!.height * 4;
            canvasCtx.current = node.getContext("2d", {willReadFrequently: true, opacity: false});
        }
    }, [])

    const processChunk = useCallback((chunk: number[]) => {
        const f = new DFT();

        // Calculate DFT and crop it according to the max frequency
        let dft = f.computeDFT(chunk);
        const minIndex = Math.floor(dft.length * settings.minFrequency / settings.sampleRate * 2);
        const maxIndex = Math.floor(dft.length * settings.maxFrequency / settings.sampleRate * 2);
        dft = dft.slice(minIndex, maxIndex);


        // Compute the highest value in the past 5 seconds for amplitude scaling
        maxAmplitudes.current[chunkIndex.current] = Math.max(...dft);
        const chunksInFiveSeconds = Math.floor(settings.sampleRate / settings.timeResolution) * 5;
        chunkIndex.current = (chunkIndex.current + 1) % chunksInFiveSeconds;
        const currentMax = Math.max(...maxAmplitudes.current);


        if (canvas.current != null && canvasCtx.current != null) {
            requestAnimationFrame(() => plotSpectrogram(canvas.current!, canvasCtx.current!, settings, dft, currentMax))
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
                    // Calculate how many full chunks can be taken from data with overlap
                    const overlapSize = settings.timeSamplesOverlap;
                    let numFullChunks = Math.floor((data.length - overlapSize) / (settings.timeResolution - overlapSize));

                    for (let i = 0; i < numFullChunks; i++) {
                        let chunkStartIndex = i * (settings.timeResolution - overlapSize);
                        let chunkEndIndex = chunkStartIndex + settings.timeResolution;
                        let chunk = data.slice(chunkStartIndex, chunkEndIndex);
                        processChunk(chunk);
                    }

                    // Store any remaining data to be used next time
                    remainder.current = data.slice(numFullChunks * settings.timeResolution);
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