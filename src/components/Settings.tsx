import React from "react";
import GetStream from "../scripts/Microphone";
import {RecordButton} from "./RecordButton";
import {SettingsState} from "../types/SettingsState";
import {TimeSlider} from "./TimeSlider";
import {FrequencySlider} from "./FrequencySlider";
import {TimeSamplesSlider} from "./TimeSamplesSlider";
import {WindowSelector} from "./WindowSelector";

function setMediaRecorder(setter: any, settings: SettingsState, settingsSetter: any) {
    GetStream()
        .then((stream) => {
            setter(new MediaRecorder(stream));
            settingsSetter({
                ...settings,
                sampleRate: stream.getTracks()[0].getSettings().sampleRate
            });
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
    }
}

function updateSliderValues(timeResolution: number | null, freqResolution: number | null, timeSamplesOverlap: number | null, settingsSetter: any) {
    if (timeResolution !== null) {
        // freqResolution =
        // settingsSetter()
    } else if (freqResolution !== null) {

    } else if (timeSamplesOverlap !== null) {

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
                      startCallback={() => setMediaRecorder(recorderSetter, settings, settingsSetter)}
                      stopCallback={() => stopRecording(recorder, recorderSetter)}/>
        <FrequencySlider freqResolution={settings.freqResolution}/>
        <TimeSlider timeResolution={settings.timeResolution}/>
        <TimeSamplesSlider timeSamples={settings.timeSamplesOverlap}/>
        <WindowSelector windowChoices={settings.windowFunctions} currentWindow={settings.window}
                        handleChange={(value) => updateWindowFunction(value, settings, settingsSetter)}/>
    </>;
}