import {INodeGroupFactory, INodeGroup} from "@alchemist/core";
import {NamespaceNodeGroup} from "..";

export class NamespaceNodeGroupFactory implements INodeGroupFactory
{
    public create = (nodeGroupTypeId: string, name: string, args: any): INodeGroup => {
        return new NamespaceNodeGroup(true, name);
    }
}

