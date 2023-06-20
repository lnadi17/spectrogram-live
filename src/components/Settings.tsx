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

function updateSliderValues(timeResolution: number | null, freqResolution: number | null, timeSamplesOverlap: number | null, settings: SettingsState, settingsSetter: any) {
    if (timeResolution !== null) {
        settingsSetter({
            ...settings,
            timeResolution: timeResolution
        });
    } else if (freqResolution !== null) {
        settingsSetter({
            ...settings,
            freqResolution: freqResolution
        });
    } else if (timeSamplesOverlap !== null) {
        settingsSetter({
            ...settings,
            timeSamplesOverlap: timeSamplesOverlap
        });
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
        <FrequencySlider freqResolution={settings.freqResolution}
                         changeHandler={(v: number) => updateSliderValues(null, v, null, settings, settingsSetter)}/>
        <TimeSlider timeResolution={settings.timeResolution}
                    changeHandler={(v: number) => updateSliderValues(v, null, null, settings, settingsSetter)}/>
        <TimeSamplesSlider timeSamples={settings.timeSamplesOverlap}
                           changeHandler={(v: number) => updateSliderValues(null, null, v, settings, settingsSetter)}/>
        <WindowSelector windowChoices={settings.windowFunctions} currentWindow={settings.window}
                        handleChange={(value) => updateWindowFunction(value, settings, settingsSetter)}/>
    </>;
}