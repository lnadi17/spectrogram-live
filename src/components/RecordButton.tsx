import {Button} from "@chakra-ui/react";
import React from "react";

export function RecordButton({
                                 isRecording,
                                 startCallback,
                                 stopCallback
                             }: { isRecording: boolean, startCallback: any, stopCallback: any }) {
    return <Button colorScheme="teal" variant="outline" onClick={isRecording ? stopCallback : startCallback}>
        {isRecording ? "Stop Recording" : "Start Recording"}
    </Button>;
}

