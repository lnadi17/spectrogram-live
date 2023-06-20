import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function FrequencySlider({freqResolution, changeHandler}: {freqResolution: number, changeHandler: any}) {
    return (<>
        <Text>Frequency Resolution</Text>
        <Slider defaultValue={freqResolution} min={1} max={400} step={1} w={"75%"} display={"inline-block"} onChange={changeHandler}>
            <SliderTrack bg='red.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='tomato'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>{freqResolution}</Text>
    </>);
}
