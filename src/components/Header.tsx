import {Box, Heading, Text, useBreakpointValue} from "@chakra-ui/react";
import React from "react";

function Header() {
    const fs = {base: 'sm', md: 'lg', lg: 'xl'};
    const isSmallScreen = useBreakpointValue({base: true, md: false});

    return (<Box
        as="aside"
        bg={"gray.500"}>
        <Heading m={2} color={"blue.50"}>Spectrogram Live</Heading>
        {isSmallScreen ? null :
            <Text ml={3} color={"blue.100"} fontSize={fs}>A web application developed by Luka Nadiradze during
                the Digital Signal
                Processing course.</Text>}
        <Text ml={3} mb={1} color={"blue.100"} fontSize={fs}>Record the sound from your microphone and see
            what frequencies the sound consists of.</Text>
    </Box>);
}

export default Header;