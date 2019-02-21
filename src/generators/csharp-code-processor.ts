import {ICodeProcessor, DefaultOrder, IGeneratedCode} from "@alchemist/core";
import {CodegenProxy} from "./codegen-proxy";

export class CSharpCodeProcessor implements ICodeProcessor
{
    public order: number = DefaultOrder;

    public canHandleType(generatedCode: IGeneratedCode): boolean {
        console.log("CAN HANDLE", generatedCode.fileLocation, generatedCode.fileLocation.indexOf(".cs") >= 1);
        return generatedCode.fileLocation.indexOf(".cs") >= 1;
    }

    public async process(generatedCode: IGeneratedCode): Promise<any> {
        console.log("FORMATTING", generatedCode.fileLocation);
        const formattedCode = await CodegenProxy.formatCode(generatedCode.code);
        console.log("OUPUTTING", generatedCode.code, formattedCode);
        generatedCode.code = formattedCode;
        return;
    }
}
