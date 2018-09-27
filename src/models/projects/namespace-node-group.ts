import {INodeGroup, INode, WorkspaceConfig, FolderNodeGroup} from "@alchemist-editor/core";

export class NamespaceNodeGroup extends FolderNodeGroup
{
    public constructor(public isNamespace = false, public name = "", public workspaceConfig = new WorkspaceConfig(), public nodes: Array<INode> = [])
    { super(name, workspaceConfig, nodes); }
}