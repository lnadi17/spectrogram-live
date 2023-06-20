import {
    AbsoluteCenter,
    Box,
    Button,
    Center,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Stack,
    Text
} from "@chakra-ui/react";
import React from "react";

function Settings() {
    return <>
        <Button colorScheme="teal" variant="outline">
            Start Recording
        </Button>
        <Text>Perspective</Text>
        <RadioGroup defaultValue="2" m={2}>
            <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                    3D
                </Radio>
                <Radio colorScheme="green" value="2">
                    2D
                </Radio>
            </Stack>
        </RadioGroup>
        <Text>Frequency Scale</Text>
        <RadioGroup defaultValue="2" m={2}>
            <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                    Logarithmic
                </Radio>
                <Radio colorScheme="green" value="2">
                    Linear
                </Radio>
            </Stack>
        </RadioGroup>
        <Text>Frequency Resolution</Text>
        <Slider defaultValue={60} min={0} max={100} step={1} w={"75%"} display={"inline-block"}>
            <SliderTrack bg='red.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='tomato'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>1231</Text>
        <Text>Time Resolution</Text>
        <Slider defaultValue={60} min={0} max={100} step={1} w={"75%"} display={"inline-block"}>
            <SliderTrack bg='green.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='green.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>1231</Text>
        <Text>Time Samples Overlap</Text>
        <Slider defaultValue={60} min={0} max={100} step={1} w={"75%"} display={"inline-block"}>
            <SliderTrack bg='blue.100'>
                <Box position='relative' right={50}/>
                <SliderFilledTrack bg='blue.500'/>
            </SliderTrack>
            <SliderThumb boxSize={3}/>
        </Slider>
        <Text as="span" mx={1}>1231</Text>
        <Text>Window Function</Text>
        <Flex>
            <RadioGroup defaultValue="2" m={2}>
                <Radio px={1} colorScheme="blue" value="1">
                    Rectangular
                </Radio>
                <Radio px={1} colorScheme="blue" value="2">
                    Hanning
                </Radio>
                <Radio px={1} colorScheme="blue" value="3">
                    Hamming
                </Radio>
            </RadioGroup>
        </Flex>
    </>;
}

export default Settings;