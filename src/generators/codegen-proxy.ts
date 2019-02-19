console.log("LOADING ELECTRON");
import {remote} from "electron";
import {join} from "path";
const fs = remote.require('fs');
const app = remote.app;
console.log("LOADED ELECTRON");

console.log("CALCULATING EDGE DIRS");
const assemblyDir = `${app.getAppPath()}/codegen/CodeGen.exe`;

if (!fs.existsSync(assemblyDir)) {
    console.log("Unable to find CodeGen assembly, this is required for dotnet plugin to operate");
    throw "Unable to find CodeGen assembly, this is required for dotnet plugin to operate";
}

process.env.EDGE_USE_CORECLR = <any>1;
process.env.EDGE_APP_ROOT = assemblyDir;

console.log("LOADING EDGE");
import {func} from "electron-edge-js";
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
        assemblyFile: join(assemblyDir, 'CodeGen.dll'),
        typeName: 'CodeGen.Formatters.GeneralCodeFormatter',
        methodName: 'FormatCode'
    });
}