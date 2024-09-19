type KeyValuePair = {
    [key: string]: string;
};
interface Config {
    [key: string]: {
        element: string;
        css: string;
        variants: {
            [key: string]: KeyValuePair;
        };
        compoundVariants: KeyValuePair[];
    };
}
export declare const extractStyles: (path: string) => RegExpMatchArray | null;
export declare const stylesToConfig: (styles: string[]) => Config;
export declare const generateOutput: (config: Config, cssFilename: string) => string;
export declare const findFiles: (glob: string) => Promise<string[]>;
export {};
//# sourceMappingURL=utils.d.ts.map