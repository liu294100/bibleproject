declare module 'opencc-js' {
  interface ConverterOptions {
    from: string;
    to: string;
  }

  interface ConverterFunction {
    (text: string): string;
  }

  export function Converter(options: ConverterOptions): ConverterFunction;
}