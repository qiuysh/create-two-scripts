declare function optimization(opts: any): {
    runtimeChunk: boolean;
    minimize: boolean;
    moduleIds: string;
    minimizer: any[];
};
export default optimization;
