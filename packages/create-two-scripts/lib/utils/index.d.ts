import program from "commander";
declare const error: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}, warn: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}, info: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare function prompt(type: any): Promise<any>;
declare function message(key: string, msg: string): void;
export { program, prompt, message, error, warn, info };
