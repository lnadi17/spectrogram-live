import {Box, Button, Text} from "@chakra-ui/react";
import React from "react";
import {SettingsState} from "../types/SettingsState";

let chunks : any = [];

function captureHandler(recorder: MediaRecorder | null) {
    if (recorder !== null) {
        recorder.requestData();
    }
}

function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: ScriptProcessorNode | null }) {
    if (recorder != null) {
        recorder.onaudioprocess = (event) => {
            const samples = event.inputBuffer.getChannelData(0);
            console.log(samples);
        }
    }
    return (
        <Box minH={"33vh"}>
            <Text>Spectrogram here</Text>
            <Text>{recorder !== null ? "Recording In Progress" : "Not Recording"}</Text>
            {/*<Button onClick={() => captureHandler(recorder)}></Button>*/}
        </Box>
    );
}

export default Canvas;