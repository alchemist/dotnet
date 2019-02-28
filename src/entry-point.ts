import {IPlugin, PluginContext} from "@alchemist/core";
import {TypeGetters} from "./stores/modules/types/types-getters";
import {CSharpCodeProcessor} from "./generators/csharp-code-processor";

export class Plugin implements IPlugin
{
    private dotnetModule = {
        getters: new TypeGetters()
    };

    public name = "alchemist-dotnet";
    public version = "0.3.0";
    public order: 1;

    public setup(pluginContext: PluginContext): Promise<void> {

        pluginContext.store.registerModule("dotnet", this.dotnetModule);
        pluginContext.codeProcessorRegistry.addProcessor(new CSharpCodeProcessor());
        console.log("Loaded Plugin: DotNet");
        return Promise.resolve();
    }
}