import {INode} from "@alchemist/core";
import {ITypeData} from "./itype-data";
import {NamespaceNodeGroup} from "../projects/namespace-node-group";
import {TypeData} from "./type-data";

export class NodeTypeData implements ITypeData
{
    public static ReferencedNodeIdMetdata = "referenced-node-id";
    public static ReferencedNodeGroupMetadata = "referenced-node-group";

    public readonly referencedNode: INode;
    public readonly nodeGroup: NamespaceNodeGroup;

    public get namespace() { return this.nodeGroup.name; }
    public get name() { return this.referencedNode.data.name; }

    constructor(referencedNode: INode, nodeGroup: NamespaceNodeGroup, public metadata: any = {}) {
        this.referencedNode = referencedNode;
        this.nodeGroup = nodeGroup;
    }

    public toTypeData(): TypeData {
        this.metadata[NodeTypeData.ReferencedNodeIdMetdata] = this.referencedNode.id;
        this.metadata[NodeTypeData.ReferencedNodeGroupMetadata] = this.nodeGroup.name;
        return new TypeData(this.name, this.namespace, this.metadata);
    }
}