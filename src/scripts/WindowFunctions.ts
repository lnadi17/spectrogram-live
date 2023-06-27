import {WindowFunction} from "../types/WindowFunction";

export const windowFunctions: Array<WindowFunction> = [
    {
        name: "Rectangular",
        values: (n: number[]) => {
            return n
        }
    },
    {
        name: "Hanning",
        values: (n: number[]) => {
            return n.map((sample, i) => {
                const windowValue = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n.length - 1));
                return sample * windowValue;
            });
        }
    },
    {
        name: "Hamming",
        values: (n: number[]) => {
            return n.map((sample, i) => {
                const windowValue = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (n.length - 1));
                return sample * windowValue;
            });
        }
    },
    {
        name: 'Cosine',
        values: (n: number[]) => {
            return n.map((sample, i) => {
                const windowValue = Math.cos((Math.PI * i) / (n.length - 1));
                return sample * windowValue;
            });
        }
    },
    {
        name: 'Blackman-Harris',
        values: (n: number[]) => {
            const a0 = 0.35875;
            const a1 = 0.48829;
            const a2 = 0.14128;
            const a3 = 0.01168;

            return n.map((sample, i) => {
                const angle = (2 * Math.PI * i) / (n.length - 1);
                const windowValue = a0 - a1 * Math.cos(angle) + a2 * Math.cos(2 * angle) - a3 * Math.cos(3 * angle);
                return sample * windowValue;
            });
        }
    },
    {
        name: 'Tukey',
        values: (amplitudes: number[]) => {
            const alpha = 0.5;
            const windowedAmplitudes: number[] = [];
            const numPoints = amplitudes.length;
            const numTaperedPoints = Math.round(alpha * (numPoints - 1));
            const numRectangularPoints = numPoints - numTaperedPoints;

            for (let i = 0; i < numPoints; i++) {
                let windowValue: number;

                if (i < numTaperedPoints / 2) {
                    windowValue = 0.5 * (1 + Math.cos((2 * Math.PI / alpha) * ((i / alpha) - 0.5)));
                } else if (i >= numTaperedPoints / 2 && i < numTaperedPoints / 2 + numRectangularPoints) {
                    windowValue = 1.0;
                } else {
                    windowValue = 0.5 * (1 + Math.cos((2 * Math.PI / alpha) * ((i / alpha) - (numPoints / alpha) + 0.5)));
                }

                windowedAmplitudes.push(amplitudes[i] * windowValue);
            }

            return windowedAmplitudes;
        },
    }
]
