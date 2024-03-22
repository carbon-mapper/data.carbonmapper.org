import React from 'react';

export type ModuleType = {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    module: any;
    moduleClass: string;
    moduleId: string;
};

export type AllModulesType = ModuleType[];

const allModules: AllModulesType = [
    {
        type: '',
        module: <></>,
        moduleClass: '',
        moduleId: ''
    }
];

export const getModule = (moduleType: string) => {
    return [...allModules].find(({ type }) => moduleType === type);
};
