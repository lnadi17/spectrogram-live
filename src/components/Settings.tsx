import React, {useState} from "react";
import GetStream from "../scripts/Microphone";
import {RecordButton} from "./RecordButton";
import {SettingsState} from "../types/SettingsState";
import {TimeSlider} from "./TimeSlider";
import {FrequencySlider} from "./FrequencySlider";
import {TimeSamplesSlider} from "./TimeSamplesSlider";
import {WindowSelector} from "./WindowSelector";
import {Button} from "@chakra-ui/react";
import {MediaStreamRecorder} from "recordrtc";

let mus: any = [];

function startRecording(recorderSetter: any, sourceSetter: any, settings: SettingsState, settingsSetter: any) {
    GetStream()
        .then((stream) => {
            const context = new AudioContext();
            const source = context.createMediaStreamSource(stream);
            sourceSetter(source);
            // Yes, this feature is no longer recommended according to docs, but other solutions are too complex as of now.
            // Only the raw sound data is needed, the rest of the processing is still done in main thread.
            const recorder = context.createScriptProcessor(256, 1, 1);
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

    return <>
        <RecordButton isRecording={recorder !== null}
                      startCallback={() => startRecording(recorderSetter, setStream, settings, settingsSetter)}
                      stopCallback={() => stopRecording(recorder, stream, setStream, recorderSetter)}/>
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
function exportToCsv(filename: any, rows: any) {
    var processRow = function (row: any) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (false) { // IE 10+
        // navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
