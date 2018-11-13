import path from "path";

const assemblyDir = `{__dirname}/codegen/CodeGen.exe`;
eval(`process.env.EDGE_USE_CORECLR = 1;`);
eval(`process.env.EDGE_APP_ROOT = "${assemblyDir}";`);

const {func} = require("electron-edge-js");

const funcP = (codeOrDescriptor: any) => {
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