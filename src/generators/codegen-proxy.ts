import {join} from "path";
import {assemblyDir} from "./edge-env-setup";
import {funcP} from "./edge-func";

export class CodegenProxy
{
    public static formatCode = funcP({
        assemblyFile: join(assemblyDir, 'CodeGen.dll'),
        typeName: 'CodeGen.Formatters.GeneralCodeFormatter',
        methodName: 'FormatCode'
    });

    public static diagnostic = funcP({
        assemblyFile: join(assemblyDir, 'CodeGen.dll'),
        typeName: 'CodeGen.Diagnostics',
        methodName: 'Test'
    });
}

CodegenProxy.diagnostic().then(console.log).catch(console.error);