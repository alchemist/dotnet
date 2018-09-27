import {INode} from "@alchemist-editor/core";
import {ITypeData} from "@/models/types/itype-data";
import {NamespaceNodeGroup} from "@/models/projects/namespace-node-group";

export class NodeTypeData implements ITypeData
{
    public readonly referencedNode: INode;
    public get namespace() { return this.nodeGroup.name; }
    public get name() { return this.referencedNode.data.name; }

    constructor(referencedNode: INode, public nodeGroup: NamespaceNodeGroup, public metadata: any = {}) {
        this.referencedNode = referencedNode;
    }
}