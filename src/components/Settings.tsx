import React, {useState} from "react";
import GetStream from "../scripts/Microphone";
import {RecordButton} from "./RecordButton";
import {SettingsState} from "../types/SettingsState";
import {TimeSlider} from "./TimeSlider";
import {FrequencySlider} from "./FrequencySlider";
import {TimeSamplesSlider} from "./TimeSamplesSlider";
import {WindowSelector} from "./WindowSelector";
import {ColormapSelector} from "./ColormapSelector";
import {IntensityScaleSelector} from "./IntensityScaleSelector";
import {FrequencyScaleSelector} from "./FrequencyScaleSelector";
import {Box, Text} from "@chakra-ui/react";
import {FrequencyRangeSlider} from "./FrequencyRangeSlider";
import {CutoffIntensitySlider} from "./CutoffIntensitySlider";
import {PerformantRecordButton} from "./PerformantRecordButton";

function startRecording(bufferSize: number, recorderSetter: any, sourceSetter: any, settings: SettingsState, settingsSetter: any) {
    GetStream()
        .then((stream) => {
            const context = new AudioContext();
            const source = context.createMediaStreamSource(stream);
            sourceSetter(source);
            // Yes, this feature is no longer recommended according to docs, but other solutions are too complex as of now.
            // Only the raw sound data is needed, the rest of the processing is still done in main thread.
            const recorder = context.createScriptProcessor(bufferSize, 1, 1);
            source.connect(recorder);
            recorder.connect(context.destination);
            recorderSetter(recorder);
            settingsSetter({
                ...settings,
                sampleRate: context.sampleRate,
                freqResolution: context.sampleRate / settings.timeResolution
            });
        })
        .catch((err) => {
            console.log("Failed to get media recorder", err);
        });
}

function stopRecording(recorder: ScriptProcessorNode | null, source: MediaStreamAudioSourceNode | null, sourceSetter: any, recorderSetter: any) {
    if (recorder !== null) {
        recorder.disconnect();
        source?.mediaStream.getTracks()[0].stop();
        sourceSetter(null);
    }
    recorderSetter(null);
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
                         }: { settings: SettingsState, settingsSetter: any, recorder: ScriptProcessorNode | null, recorderSetter: any }) {
    const [stream, setStream] = useState<MediaStreamAudioSourceNode | null>(null);

    return <Box>
        <Text>Recording Type</Text>
        <RecordButton isRecording={recorder !== null}
                      startCallback={() => startRecording(512, recorderSetter, setStream, settings, settingsSetter)}
                      stopCallback={() => stopRecording(recorder, stream, setStream, recorderSetter)}/>
        <PerformantRecordButton isRecording={recorder !== null}
                                startCallback={() => startRecording(8192, recorderSetter, setStream, settings, settingsSetter)}/>
        <FrequencySlider freqResolution={settings.freqResolution} min={settings.sampleRate / settings.maxTimeResolution}
                         max={settings.sampleRate / settings.minTimeResolution}
                         changeHandler={(v: number) => updateSliderValues(null, v, null, settings, settingsSetter)}/>
        <TimeSlider timeResolution={settings.timeResolution} min={settings.minTimeResolution}
                    max={settings.maxTimeResolution}
                    changeHandler={(v: number) => updateSliderValues(v, null, null, settings, settingsSetter)}/>
        <TimeSamplesSlider timeSamples={settings.timeSamplesOverlap} max={settings.timeResolution / 2}
                           changeHandler={(v: number) => updateSliderValues(null, null, v, settings, settingsSetter)}/>
        <FrequencyRangeSlider currMin={settings.minFrequency} currMax={settings.maxFrequency} min={0}
                              max={settings.sampleRate / 2}
                              changeHandler={(range: [number, number]) => {
                                  settingsSetter({...settings, minFrequency: range[0], maxFrequency: range[1]})
                              }}/>
        <CutoffIntensitySlider minDB={settings.minDB}
                               changeHandler={(value: number) => settingsSetter({...settings, minDB: value})}/>
        <WindowSelector windowChoices={settings.windowFunctions} currentWindow={settings.window}
                        handleChange={(value) => updateWindowFunction(value, settings, settingsSetter)}/>
        <ColormapSelector colormapChoices={settings.cmapChoices} currentColor={settings.cmapChoice}
                          handleChange={(value) => settingsSetter({...settings, cmapChoice: value})}/>
        <IntensityScaleSelector currentChoice={settings.intensityScale}
                                handleChange={(value) => settingsSetter({...settings, intensityScale: value})}/>
        <FrequencyScaleSelector currentChoice={settings.freqScale}
                                handleChange={(value) => settingsSetter({...settings, freqScale: value})}/>
    </Box>;
}
