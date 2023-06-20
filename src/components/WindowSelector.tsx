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
import {WindowFunction} from "../types/WindowFunction";

export function WindowSelector({
                                   windowChoices,
                                   currentWindow
                               }: { windowChoices: Array<WindowFunction>, currentWindow: WindowFunction }) {
    return (<>
        <Text>Window Function</Text>
        <Flex>
            <RadioGroup defaultValue={currentWindow.name} m={2}>
                {windowChoices.map(window => {
                    return <Radio px={1} colorScheme="blue" value={window.name}>
                        {window.name}
                    </Radio>
                })}
            </RadioGroup>
        </Flex>
    </>);
}
