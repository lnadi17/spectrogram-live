import {
    Flex,
    Radio,
    RadioGroup,
    Text
} from "@chakra-ui/react";
import React from "react";
import {WindowFunction} from "../types/WindowFunction";

export function ColormapSelector({
                                   colormapChoices,
                                   currentColor,
                                   handleChange
                               }: { colormapChoices: string[], currentColor: string, handleChange: (x: string) => void }) {
    const toTitleCase = (word : string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    return (<>
        <Text>Color Mapping</Text>
        <Flex>
            <RadioGroup defaultValue={currentColor} m={2} onChange={handleChange}>
                {colormapChoices.map(color => {
                    return <Radio px={1} colorScheme="blue" value={color} key={color}>
                        {toTitleCase(color.split('_')[0])}
                    </Radio>
                })}
            </RadioGroup>
        </Flex>
    </>);
}
