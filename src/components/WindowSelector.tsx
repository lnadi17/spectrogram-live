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
                                   currentWindow,
                                   handleChange
                               }: { windowChoices: Array<WindowFunction>, currentWindow: WindowFunction, handleChange: (x: string) => void }) {
    return (<>
        <Text>Window Function</Text>
        <Flex>
            <RadioGroup defaultValue={currentWindow.name} m={2} onChange={handleChange}>
                {windowChoices.map(window => {
                    return <Radio px={1} colorScheme="blue" value={window.name} key={window.name}>
                        {window.name}
                    </Radio>
                })}
            </RadioGroup>
        </Flex>
    </>);
}
