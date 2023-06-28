import {
    Flex,
    Radio,
    RadioGroup,
    Text
} from "@chakra-ui/react";
import React from "react";

export function FrequencyScaleSelector({
                                   currentChoice,
                                   handleChange
                               }: { currentChoice: string, handleChange: (x: string) => void }) {
    return (<>
        <Text>Frequency Scale</Text>
        <Flex>
            <RadioGroup defaultValue={currentChoice} m={2} onChange={handleChange}>
                {['Linear', 'Mel'].map(item => {
                    return <Radio px={1} colorScheme="blue" value={item} key={item}>
                        {item}
                    </Radio>
                })}
            </RadioGroup>
        </Flex>
    </>);
}
