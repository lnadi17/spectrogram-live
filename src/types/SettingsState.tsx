import {WindowFunction} from "./WindowFunction";
import React from "react";

export interface SettingsState {
    freqResolution: number,
    timeResolution: number,
    timeSamplesOverlap: number,
    sampleRate: number,
    minTimeResolution: number,
    maxTimeResolution: number,
    window: WindowFunction,
    windowFunctions: Array<WindowFunction>
}