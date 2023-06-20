import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function FrequencySlider({
                                    freqResolution,
                                    min,
                                    max,
                                    changeHandler
                                }: { freqResolution: number, min: number, max: number, changeHandler: any }) {
    return (<>
        <Text>Frequency Resolution</Text>
        <Slider defaultValue={freqResolution} min={min} max={max} step={1} w={"75%"} display={"inline-block"}
                onChange={changeHandler} value={freqResolution}>
            <SliderTrack bg='red.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='tomato'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={5}>{freqResolution.toFixed(0)}</Text>
    </>);
}
