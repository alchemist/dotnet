import {IProject, IProjectGenerator} from "@alchemist/core"
import {join} from "path"

const template = (project: IProject, generator: DotNetProjectGenerator, options?: any) => {

    return `
        <Project Sdk="Microsoft.NET.Sdk">
            <PropertyGroup>
                <TargetFramework>${project.metadata.targetFrameworks.join(",")}</TargetFramework>
                <Title>${project.projectName}</Title>                
            </PropertyGroup>        
            ${generator.generateCustomSections(project, options)}
        </Project>`;
};


export abstract class DotNetProjectGenerator implements IProjectGenerator
{
    abstract readonly name;
    abstract readonly version;

    readonly replaceExisting = false;

    abstract canHandleType(project: IProject): boolean;
    abstract generateCustomSections(project: IProject, options?: any): string;

    computeFileLocation(project: IProject): string {
        return join(project.outputDirectory, `${project.projectName}.csproj`);
        //return join(project.outputDirectory, project.projectName, `${project.projectName}.csproj`);
    }

    generate(project: IProject, options?: any): Promise<string>  {
        const templateOutput = template(project, this, options);
        return Promise.resolve(templateOutput);
    }
}