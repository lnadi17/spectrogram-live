import {
    Flex,
    Radio,
    RadioGroup,
    Text
} from "@chakra-ui/react";
import React from "react";
import {WindowFunction} from "../types/WindowFunction";

export function IntensityScaleSelector({
                                   currentChoice,
                                   handleChange
                               }: { currentChoice: string, handleChange: (x: string) => void }) {
    return (<>
        <Text>Intensity Scale</Text>
        <Flex>
            <RadioGroup defaultValue={currentChoice} m={2} onChange={handleChange}>
                {['Linear', 'dB'].map(item => {
                    return <Radio px={1} colorScheme="blue" value={item} key={item}>
                        {item}
                    </Radio>
                })}
            </RadioGroup>
        </Flex>
    </>);
}
