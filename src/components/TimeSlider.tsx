import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function TimeSlider({
                               timeResolution, min, max, changeHandler
                           }: { timeResolution: number, min: number, max: number, changeHandler: any }) {
    return (<>
        <Text>Time Resolution</Text>
        <Slider defaultValue={timeResolution} min={min} max={max} step={1} w={"75%"} display={"inline-block"}
                onChange={changeHandler} value={timeResolution}>
            <SliderTrack bg='green.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='green.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={5}>{timeResolution.toFixed(0)}</Text>
    </>);
}
