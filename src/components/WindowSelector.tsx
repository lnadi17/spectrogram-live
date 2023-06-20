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

export function WindowSelector({windowChoices}: {windowChoices: WindowFunction}) {
    return (<>
        <Text>Window Function</Text>
        <Flex>
            <RadioGroup defaultValue="2" m={2}>
                <Radio px={1} colorScheme="blue" value="1">
                    Rectangular
                </Radio>
                <Radio px={1} colorScheme="blue" value="2">
                    Hanning
                </Radio>
                <Radio px={1} colorScheme="blue" value="3">
                    Hamming
                </Radio>
            </RadioGroup>
        </Flex>
    </>);
}
