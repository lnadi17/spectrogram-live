import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function TimeSamplesSlider({timeSamples}: {timeSamples: number}) {
    return (<>
        <Text>Time Samples Overlap</Text>
        <Slider defaultValue={60} min={0} max={100} step={1} w={"75%"} display={"inline-block"}>
            <SliderTrack bg='blue.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='blue.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>{timeSamples}</Text>
    </>);
}
