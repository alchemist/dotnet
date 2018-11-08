import {INode} from "@alchemist/core";
import {ITypeData} from "./itype-data";
import {NamespaceNodeGroup} from "../projects/namespace-node-group";

export class NodeTypeData implements ITypeData
{
    public readonly referencedNode: INode;
    public get namespace() { return this.nodeGroup.name; }
    public get name() { return this.referencedNode.data.name; }

    constructor(referencedNode: INode, public nodeGroup: NamespaceNodeGroup, public metadata: any = {}) {
        this.referencedNode = referencedNode;
    }
}