import {WindowFunction} from "./WindowFunction";
import React from "react";

export interface SettingsState {
    freqResolution: number,
    timeResolution: number,
    timeSamplesOverlap: number,
    window: WindowFunction,
    windowFunctions: Array<WindowFunction>
}