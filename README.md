# Spectrogram Live

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a React application that enables real-time visualization of audio spectrogram. It utilizes customizable time/frequency resolution, windowing functions, color mappings, amplitude and frequency scales to generate interactive spectrogram representation. 

You can visit the demo website at [https://lnadi17.github.io/spectrogram-live](https://lnadi17.github.io/spectrogram-live)

## Features

- Real-time audio processing and visualization
- Two recording modes, low latency, which is smoother and high quality, which produces less glitches and artifacts
- Control on time and frequency resolutions, which allow users to observe time-frequency tradeoff
- Multiple windowing fuctions to observe their effects on the spectrogram
- Control over how much time samples overlap each other
- Control the frequency range, it allows to 'zoom in' on the frequency scale
- Slider for cuttof intensity, which adjusts spectrogram sensitivity
- Automatic intensity scale adjustment based on the previous microphone input
- Choice of the intensity scale, Linear or dB
- Along with the linear frequency scaling, option to have Mel scale which is more understandable for humans
- Spectrogram generation using FFT and windowing functions
- Responsive design for optimal viewing on various devices
