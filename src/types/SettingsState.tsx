import {WindowFunction} from "./WindowFunction";
import React from "react";

export interface SettingsState {
    freqResolution: number,
    timeResolution: number,
    timeSamplesOverlap: number,
    sampleRate: number,
    minTimeResolution: number,
    maxTimeResolution: number,
    minFrequency: number,
    maxFrequency: number,
    minDB: number,
    freqScale: 'mel' | 'linear',
    intensityScale: 'linear' | 'dB',
    cmapChoice: string,
    cmapChoices: Array<string>,
    window: WindowFunction,
    windowFunctions: Array<WindowFunction>
}