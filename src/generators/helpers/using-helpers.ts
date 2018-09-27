import {ITypeData} from "@/models/types/itype-data";

export const generateUsing = (using: string) => {
    return `using ${using};`;
};

export const generateUsings = (usings: Array<string>) => {
    return usings.map(generateUsing).join("\r\n");
};

export const addUsings = (usings: Array<string>, ...newUsings: Array<string>) => {
    newUsings.forEach(x => {
        if(usings.indexOf(x) >= 0) { return; }
        usings.push(x);
    });
};

export const getAllUsingsFromTypes = (types: Array<ITypeData>) => {
    const usings: Array<string> = [];
    types.forEach(type => {
        addUsings(usings, type.namespace);
    });
    return usings;
};