declare function createLoaders({ esbuild, ts, hot }: {
    esbuild: any;
    ts: any;
    hot: any;
}): {
    oneOf: ({
        test: RegExp;
        include: string;
        use: ({
            loader: string;
            options: {
                loader: string;
                target: string;
            };
        } | {
            loader: string;
            options: {
                cacheDirectory: boolean;
                configFile: boolean;
                babelrc: boolean;
                presets: (string | {
                    ts: any;
                    development: boolean;
                })[][];
                plugins: string[];
            };
        } | {
            loader: string;
            options: {
                workers: number;
            };
        })[];
        exclude?: undefined;
        type?: undefined;
        generator?: undefined;
    } | {
        test: RegExp;
        exclude: RegExp;
        use: (string | {
            loader: string;
            options: {
                lessOptions: {
                    javascriptEnabled: boolean;
                };
            };
        })[];
        include?: undefined;
        type?: undefined;
        generator?: undefined;
    } | {
        test: RegExp;
        exclude: RegExp;
        use: (string | {
            loader: string;
            options: {
                implementation: string;
            };
        })[];
        include?: undefined;
        type?: undefined;
        generator?: undefined;
    } | {
        test: RegExp;
        type: string;
        generator: {
            filename: string;
        };
        include?: undefined;
        use?: undefined;
        exclude?: undefined;
    })[];
}[];
export default createLoaders;
