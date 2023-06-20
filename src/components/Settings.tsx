import {
    Box,
    Flex,
    Radio,
    RadioGroup,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text
} from "@chakra-ui/react";
import React from "react";
import GetStream from "../scripts/Microphone";
import {RecordButton} from "./RecordButton";
import {SettingsState} from "../types/SettingsState";
import {TimeSlider} from "./TimeSlider";
import {FrequencySlider} from "./FrequencySlider";
import {TimeSamplesSlider} from "./TimeSamplesSlider";
import {WindowSelector} from "./WindowSelector";
import {WindowFunction} from "../types/WindowFunction";

function setMediaRecorder(setter: any) {
    GetStream()
        .then((stream) => {
            setter(new MediaRecorder(stream));
        })
        .catch((err) => {
            console.log("Failed to get media recorder", err);
        });
}

function stopRecording(recorder: MediaRecorder | null, setter: any) {
    if (recorder !== null) {
        recorder.stream.getTracks()[0].stop();
        recorder.stop();
    }
    setter(null);
}

function updateWindowFunction(windowName: string, settings: SettingsState, settingsSetter: any) {
    const currentWindow = settings.windowFunctions.find(item => item.name === windowName);
    if (currentWindow !== null) {
        settingsSetter({...settings, window: currentWindow});
        console.log(currentWindow);
    }
}

export function Settings({
                             settings,
                             settingsSetter,
                             recorder,
                             recorderSetter,
                         }: { settings: SettingsState, settingsSetter: any, recorder: MediaRecorder | null, recorderSetter: any }) {
    return <>
        <RecordButton isRecording={recorder !== null}
                      startCallback={() => setMediaRecorder(recorderSetter)}
                      stopCallback={() => stopRecording(recorder, recorderSetter)}/>
        <FrequencySlider freqResolution={settings.freqResolution}/>
        <TimeSlider timeResolution={settings.timeResolution}/>
        <TimeSamplesSlider timeSamples={settings.timeSamplesOverlap}/>
        <WindowSelector windowChoices={settings.windowFunctions} currentWindow={settings.window}
                        handleChange={(value) => updateWindowFunction(value, settings, settingsSetter)}/>
    </>;
}