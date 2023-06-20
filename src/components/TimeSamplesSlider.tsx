import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function TimeSamplesSlider({timeSamples, changeHandler}: {timeSamples: number, changeHandler: any}) {
    return (<>
        <Text>Time Samples Overlap</Text>
        <Slider defaultValue={timeSamples} min={0} max={100} step={1} w={"75%"} display={"inline-block"} onChange={changeHandler}>
            <SliderTrack bg='blue.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='blue.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>{timeSamples}</Text>
    </>);
}
