# Spectrogram Live

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a React application that enables real-time visualization of audio spectrogram. It utilizes customizable time/frequency resolution, windowing functions, color mappings, amplitude and frequency scales to generate interactive spectrogram representation. 

You can visit the demo website at [https://lnadi17.github.io/spectrogram-live](https://lnadi17.github.io/spectrogram-live)

## Features

- Real-time audio processing and visualization
- Two recording modes: "Low Latency" for smoother performance and "High Quality" for reduced audio glitches
- Control over time and frequency resolutions, allowing users to observe the time-frequency tradeoff
- Multiple windowing fuctions to observe their effects on the spectrogram
- Adjustable overlap of time samples
- Control the frequency range, which allows to 'zoom in' on the frequency scale
- Slider for adjusting cutoff intensity, to fine-tune spectrogram sensitivity to the noise
- Automatic intensity scale adjustment based on the previous microphone input
- Choice of intensity scale: Linear or dB
- Linear frequency scaling and an option for Mel scale which is more understandable for humans
- Responsive design for optimal viewing on various devices

## Usage

The application consists of a large canvas in the center where the spectrogram is drawn, and a settings panel on the right side (or bottom for small devices).

Click "Low Latency" button to connect the microphone and start recording sound. If the audio is producing too much artifacts, stop the recording and try "High Quality" mode. 

Adjust the sliders and radio buttons in the settings panel to customize the spectrogram's appearance. Scroll the panel to reveal additional options.

## Installation

This project was created using the `create-react-app` script. If you want to run the development environment on your machine, after cloning the repository, open terminal in that folder and run:
```sh
npm install
```
After which you can run local server with:
```sh
npm run start
```
If you don't plan to change the code, you can always visit the demo website directly.

## Learn More

This project is related to my older project, [spectro-kg](https://github.com/lnadi17/spectro-kg), which is a command-line tool for creating spectrograms from the .wav files. However, spectrogram-live is different from that because this time spectrogram is created in real-time. Also, this project is written using React and Typescript instead of Python.

For some design choices I have drawn inspiration from another open-source project [lvillasen/Spectrogram](https://github.com/lvillasen/Spectrogram) which is written in JavaScript. Matplotlib-like colors are taken from the [timothygebhard/js-colormaps](https://github.com/timothygebhard/js-colormaps).

I am using `createScriptProcessorNode` function from the Web API, which is considered deprecated, because it runs in the main thread. I still went with it because I could not find an easy way to get raw audio data the other way. This is why on some devices audio, and therefore spectrogram, may have some glitches.
