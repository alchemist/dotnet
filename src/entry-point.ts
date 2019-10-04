import {IPlugin, NodeGroupEntry, PluginContext} from "@alchemist/core";
import {TypeGetters} from "./stores/modules/types/types-getters";
import {CSharpCodeProcessor} from "./generators/csharp-code-processor";
import {NamespaceNodeGroup} from "./models/projects/namespace-node-group";
import {NamespaceNodeGroupFactory} from "./factories/namespace-node-group-factory";

export class Plugin implements IPlugin
{
    private dotnetModule = {
        namespaced: true,
        getters: new TypeGetters()
    };

    public name = "alchemist-dotnet";
    public version = "0.3.0";
    public order: 1;

    public setup(pluginContext: PluginContext): Promise<void> {

        pluginContext.store.registerModule("dotnet", this.dotnetModule);
        pluginContext.codeProcessorRegistry.addProcessor(new CSharpCodeProcessor());

        const namespaceNodeGroup = new NodeGroupEntry(NamespaceNodeGroup.NodeGroupType.id, new NamespaceNodeGroupFactory(), "Namespace");
        pluginContext.nodeGroupRegistry.addNodeGroup(namespaceNodeGroup);

        console.log("Loaded Plugin: DotNet");
        return Promise.resolve();
    }
}