import {Button} from "@chakra-ui/react";
import React from "react";

export function PerformantRecordButton({
                                           isRecording,
                                           startCallback,
                                       }: { isRecording: boolean, startCallback: any }) {
    if (!isRecording) {
        return <Button colorScheme="teal" variant="outline" onClick={startCallback} ml={2}>
            High Quality
        </Button>
    } else {
        return <></>
    }
}

