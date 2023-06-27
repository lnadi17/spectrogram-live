export class DFT {
    public computeDFT(signal: number[]): number[] {
        const N = signal.length;
        const spectrum: number[] = [];

        // Pad the signal with zeros to the nearest power of 2
        const paddedSignal = this.padSignal(signal);

        // Perform FFT computation
        const fftResult = this.fft(paddedSignal);

        // Calculate the magnitudes of the complex values
        for (let i = 0; i < N; i++) {
            const real = fftResult[i].re;
            const imag = fftResult[i].im;
            const magnitude = Math.sqrt(real * real + imag * imag);
            spectrum.push(magnitude);
        }

        return spectrum;
    }

    private fft(signal: number[]): ComplexNumber[] {
        const N = signal.length;

        if (N <= 1) {
            return signal.map((value) => new ComplexNumber(value, 0));
        }

        const even = this.fft(signal.filter((_, index) => index % 2 === 0));
        const odd = this.fft(signal.filter((_, index) => index % 2 === 1));

        const spectrum: ComplexNumber[] = [];

        for (let k = 0; k < N / 2; k++) {
            const angle = -2 * Math.PI * k / N;
            const twiddle = new ComplexNumber(Math.cos(angle), Math.sin(angle));

            const term = twiddle.multiply(odd[k]);
            const sum = even[k].add(term);
            const difference = even[k].subtract(term);

            spectrum[k] = sum;
            spectrum[k + N / 2] = difference;
        }

        return spectrum;
    }

    private padSignal(signal: number[]): number[] {
        const N = signal.length;
        const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(N)));
        const paddedSignal = [...signal];

        for (let i = N; i < nextPowerOf2; i++) {
            paddedSignal.push(0);
        }

        return paddedSignal;
    }
}

class ComplexNumber {
    public re: number;
    public im: number;

    constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }

    public add(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.re + other.re, this.im + other.im);
    }

    public subtract(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.re - other.re, this.im - other.im);
    }

    public multiply(other: ComplexNumber): ComplexNumber {
        const re = this.re * other.re - this.im * other.im;
        const im = this.re * other.im + this.im * other.re;
        return new ComplexNumber(re, im);
    }
}





