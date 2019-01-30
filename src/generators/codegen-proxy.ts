console.log("LOADING ELECTRON");
import {remote} from "electron";
const fs = remote.require('fs');
const app = remote.app;
console.log("LOADED ELECTRON");

import path from "path";

console.log("LOADING EDGE");
const assemblyDir = `${app.getAppPath()}/codegen/CodeGen.exe`;

if (!fs.existsSync(assemblyDir)) {
    console.log("Unable to find CodeGen assembly, this is required for dotnet plugin to operate");
    throw "Unable to find CodeGen assembly, this is required for dotnet plugin to operate";
}

eval(`process.env.EDGE_USE_CORECLR = 1;`);
//eval(`process.env.EDGE_APP_ROOT = "${assemblyDir}";`);

const {func} = remote.require("electron-edge-js");
console.log("LOADED EDGE");

const funcP = (codeOrDescriptor: any) => {
    console.log("STARTING FUNC");
    const handle = func(codeOrDescriptor);
    return (data?: any) : Promise<any> => {
        return new Promise((resolve, reject) => {
            handle(data, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
};

export class CodegenProxy
{
    public static formatCode = funcP({
        assemblyFile: path.join(assemblyDir, 'CodeGen.dll'),
        typeName: 'CodeGen.Formatters.GeneralCodeFormatter',
        methodName: 'FormatCode'
    });
}