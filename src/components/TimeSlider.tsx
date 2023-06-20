import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function TimeSlider({timeResolution, changeHandler}: {timeResolution: number, changeHandler: any}) {
    return (<>
        <Text>Time Resolution</Text>
        <Slider defaultValue={timeResolution} min={200} max={2000} step={1} w={"75%"} display={"inline-block"} onChange={changeHandler}>
            <SliderTrack bg='green.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='green.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>{timeResolution}</Text>
    </>);
}
