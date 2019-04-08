import {Project} from "@alchemist/core";

export class DotNetProject extends Project
{
    protected constructor(projectType: string, version: string, projectName: string, outputDirectory: string)
    {
        super(projectType, version, projectName, outputDirectory);

        this.metadata.targetFrameworks = ["netstandard2.0"];
    }
}