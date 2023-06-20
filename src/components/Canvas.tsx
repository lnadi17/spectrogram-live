import {Box, Text} from "@chakra-ui/react";
import React from "react";
import {SettingsState} from "../types/SettingsState";

function Canvas({
                    settings,
                    recorder,
                }: { settings: SettingsState, recorder: MediaRecorder | null}) {
    return (
        <Box minH={"33vh"}>
            <Text>Spectrogram here</Text>
            <Text>{recorder !== null ? "Recording In Progress" : "Not Recording"}</Text>
        </Box>
    );
}

export default Canvas;