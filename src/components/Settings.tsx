import React from "react";
import GetStream from "../scripts/Microphone";
import {RecordButton} from "./RecordButton";
import {SettingsState} from "../types/SettingsState";
import {TimeSlider} from "./TimeSlider";
import {FrequencySlider} from "./FrequencySlider";
import {TimeSamplesSlider} from "./TimeSamplesSlider";
import {WindowSelector} from "./WindowSelector";

function startRecording(setter: any, settings: SettingsState, settingsSetter: any) {
    GetStream()
        .then((stream) => {
            setter(new MediaRecorder(stream));
            const sampleRate = stream.getTracks()[0].getSettings().sampleRate || 8000;
            settingsSetter({
                ...settings,
                sampleRate: sampleRate,
                freqResolution: sampleRate / settings.timeResolution
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
        freqResolution = settings.sampleRate / timeResolution;
    } else if (freqResolution !== null) {
        timeResolution = settings.sampleRate / freqResolution;
    }

    timeSamplesOverlap = timeSamplesOverlap || settings.timeSamplesOverlap;
    timeResolution = timeResolution || settings.timeResolution;
    freqResolution = freqResolution || settings.freqResolution;
    if (timeSamplesOverlap > timeResolution! / 2) {
        timeSamplesOverlap = timeResolution! / 2;
    }

    settingsSetter({
        ...settings,
        timeResolution: timeResolution,
        freqResolution: freqResolution,
        timeSamplesOverlap: timeSamplesOverlap
    });
}

export function Settings({
                             settings,
                             settingsSetter,
                             recorder,
                             recorderSetter,
                         }: { settings: SettingsState, settingsSetter: any, recorder: MediaRecorder | null, recorderSetter: any }) {
    return <>
        <RecordButton isRecording={recorder !== null}
                      startCallback={() => startRecording(recorderSetter, settings, settingsSetter)}
                      stopCallback={() => stopRecording(recorder, recorderSetter)}/>
        <FrequencySlider freqResolution={settings.freqResolution} min={settings.sampleRate / settings.maxTimeResolution}
                         max={settings.sampleRate / settings.minTimeResolution}
                         changeHandler={(v: number) => updateSliderValues(null, v, null, settings, settingsSetter)}/>
        <TimeSlider timeResolution={settings.timeResolution} min={settings.minTimeResolution}
                    max={settings.maxTimeResolution}
                    changeHandler={(v: number) => updateSliderValues(v, null, null, settings, settingsSetter)}/>
        <TimeSamplesSlider timeSamples={settings.timeSamplesOverlap} max={settings.timeResolution / 2}
                           changeHandler={(v: number) => updateSliderValues(null, null, v, settings, settingsSetter)}/>
        <WindowSelector windowChoices={settings.windowFunctions} currentWindow={settings.window}
                        handleChange={(value) => updateWindowFunction(value, settings, settingsSetter)}/>
    </>;
}