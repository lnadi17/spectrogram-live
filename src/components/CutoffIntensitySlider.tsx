import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

export function CutoffIntensitySlider({
                                    minDB,
                                    changeHandler
                                }: { minDB: number, changeHandler: any }) {
    return (<>
        <Text>Cutoff Intensity (dB only)</Text>
        <Slider defaultValue={minDB} min={-100} max={0} step={1} w={"75%"} display={"inline-block"}
                onChange={changeHandler} value={minDB}>
            <SliderTrack bg='teal.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='teal.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={5}>{minDB.toFixed(0)} dB</Text>
    </>);
}
