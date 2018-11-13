import {EntryPoint, PluginContext} from "@alchemist/core";
import {TypeGetters} from "./stores/modules/types/types-getters";
import {CSharpCodeProcessor} from "./generators/csharp-code-processor";

export const setup: EntryPoint = (pluginContext: PluginContext): Promise<any> => {
    const dotnetModule = {
        getters: new TypeGetters()
    };
    pluginContext.store.registerModule("dotnet", dotnetModule);

    pluginContext.codeProcessorRegistry.addProcessor(new CSharpCodeProcessor());

    console.log("Loaded Plugin: DotNet");
    return Promise.resolve();
};