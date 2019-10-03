import {INode} from "@alchemist/core";
import {ITypeData} from "./itype-data";
import {NamespaceNodeGroup} from "../projects/namespace-node-group";
import {TypeData} from "./type-data";
import {NodeReference} from "./node-reference";

export class NodeTypeData implements ITypeData
{
    public readonly referencedNode: INode;
    public readonly nodeGroup: NamespaceNodeGroup;

    public get namespace() { return this.nodeGroup.name; }
    public get name() { return this.referencedNode.data.name; }

    constructor(referencedNode: INode, nodeGroup: NamespaceNodeGroup, public metadata: any = {}) {
        this.referencedNode = referencedNode;
        this.nodeGroup = nodeGroup;
    }

    public toTypeData(): TypeData {
        return new TypeData(this.name, this.namespace, this.metadata);
    }

    public toNodeReferences() {
        return new NodeReference(this.referencedNode.id, this.nodeGroup.name);
    }
}