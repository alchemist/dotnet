import {NodeEntry, NodeRegistry, NodeGeneratorRegistry} from "@alchemist-editor/core";
import {TypeGetters} from "./stores/modules/types/types-getters";

export function setup(nodeRegistry: NodeRegistry, generatorRegistry: NodeGeneratorRegistry, stores: any): Promise<any> {
    const dotnetModule = {
        getters: new TypeGetters()
    };
    stores.registerModule("dotnet", dotnetModule);
    console.log("Loaded Plugin: DotNet");
    return Promise.resolve();
}