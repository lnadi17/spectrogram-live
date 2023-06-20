import {WindowFunction} from "./WindowFunction";
import React from "react";

export interface SettingsState {
    freqResolution: number,
    timeResolution: number,
    timeSamplesOverlap: number,
    sampleRate: number,
    minTimeResolution: 200,
    maxTimeResolution: 2000,
    window: WindowFunction,
    windowFunctions: Array<WindowFunction>
}