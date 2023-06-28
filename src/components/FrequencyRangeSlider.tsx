import {
    Box,
    RangeSlider, RangeSliderFilledTrack, RangeSliderThumb,
    RangeSliderTrack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text
} from "@chakra-ui/react";
import React from "react";

export function FrequencyRangeSlider({
                               currMin, currMax, min, max, changeHandler
                           }: { currMin: number, currMax: number, min: number, max: number, changeHandler: any }) {
    function formatFrequency(frequency: number) {
        if (frequency >= 1000) {
            // Format frequency in kHz
            return (frequency / 1000).toFixed(1) + 'kHz';
        } else {
            // Format frequency in Hz
            return frequency + 'Hz';
        }
    }

    return (<>
        <Text>Frequency Range</Text>
        <RangeSlider defaultValue={[min, max]} min={min} max={max} step={100} w={"50%"} display={"inline-block"}
                     onChange={changeHandler}>
            <RangeSliderTrack bg='purple.100'>
                <Box position='relative' right={50}/>
                <RangeSliderFilledTrack bg='purple.500'/>
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={3} index={0}/>
            <RangeSliderThumb boxSize={3} index={1}/>
        </RangeSlider>
        <Text as="span" mx={5}>{formatFrequency(currMin)} to {formatFrequency(currMax)}</Text>
    </>);
}
