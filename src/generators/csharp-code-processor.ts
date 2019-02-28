import {ICodeProcessor, DefaultOrdering, IGeneratedCode} from "@alchemist/core";
import {CodegenProxy} from "./codegen-proxy";

export class CSharpCodeProcessor implements ICodeProcessor
{
    public order: number = DefaultOrdering;

    public canHandleType(generatedCode: IGeneratedCode): boolean {
        return generatedCode.fileLocation.indexOf(".cs") >= 1;
    }

    public normalizeNewLines(generatedCode: IGeneratedCode):void {
        generatedCode.code = generatedCode.code.replace(/(\n[\s]*){3}/g, "\n\n");
    }

    public async process(generatedCode: IGeneratedCode): Promise<any> {
        this.normalizeNewLines(generatedCode);
        const formattedCode = await CodegenProxy.formatCode(generatedCode.code);
        console.log("OUPUTTING", generatedCode.code, formattedCode);
        generatedCode.code = formattedCode;
        return;
    }
}
