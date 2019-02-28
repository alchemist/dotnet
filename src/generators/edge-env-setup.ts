import {remote} from "electron";
const fs = remote.require('fs');

const paths: any = remote.getGlobal("paths");
export const assemblyDir = `${paths.plugins}/dotnet/dist_codegen`;

if (!fs.existsSync(assemblyDir)) {
    const errorMessage = `Unable to find CodeGen assembly, this is required for dotnet plugin to operate: ${assemblyDir}`;
    console.log(errorMessage);
    throw errorMessage;
}

process.env.EDGE_USE_CORECLR = <any>1;
process.env.EDGE_APP_ROOT = assemblyDir;