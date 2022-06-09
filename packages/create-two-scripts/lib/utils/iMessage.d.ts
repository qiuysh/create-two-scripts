declare const defaultTempData: {
    type: string;
    message: string;
    name: string;
    choices: ({
        name: string;
        value: string;
        checked: boolean;
    } | {
        name: string;
        value: string;
        checked?: undefined;
    })[];
}[];
declare const createPackageData: {
    type: string;
    name: string;
    message: string;
    default: string | undefined;
}[];
declare const installDependenciesData: {
    type: string;
    message: string;
    name: string;
    choices: ({
        name: string;
        value: boolean;
        checked: boolean;
    } | {
        name: string;
        value: boolean;
        checked?: undefined;
    })[];
}[];
export { defaultTempData, createPackageData, installDependenciesData, };
