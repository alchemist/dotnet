import {ICodeProcessor, DefaultOrder, IGeneratedCode} from "@alchemist/core";
import {CodegenProxy} from "./codegen-proxy";

export class CSharpCodeProcessor implements ICodeProcessor
{
    public order: number = DefaultOrder;

    public canHandleType(generatedCode: IGeneratedCode): boolean {
        return generatedCode.fileLocation.indexOf(".cs") >= 1;
    }

    public async process(generatedCode: IGeneratedCode): Promise<any> {
        const formattedCode = await CodegenProxy.formatCode(generatedCode.code);
        generatedCode.code = formattedCode;
        return;
    }
}
