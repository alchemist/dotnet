import {INode, INodeGroup, IProject, IProjectSerializer, nodeGroupRegistry, nodeRegistry} from "@alchemist/core";
import {NodeTypeData} from "../models/types/node-type-data";
import {NodeReference} from "../models/types/node-reference";
import {NamespaceNodeGroup} from "../models/projects/namespace-node-group";

export class DotNetProjectSerializer implements IProjectSerializer
{
    public nodeTypeReplacer(key: string , value: any) : any
    {
        if(value instanceof NodeTypeData)
        { return (value as NodeTypeData).toNodeReferences(); }
        return value;
    }

    public getNodeTypeData(project: IProject, nodeReference: NodeReference): NodeTypeData {

        const nodeGroup = project.nodeGroups.find(x => {
            console.log("DEB", x.displayName, nodeReference.nodeGroupName);
            return (x.displayName == nodeReference.nodeGroupName);
        }) as NamespaceNodeGroup;
        const node = nodeGroup.nodes.find(x => x.id == nodeReference.nodeId);
        return new NodeTypeData(node, nodeGroup, nodeReference.metadata)
    }

    public isNodeTypeData(typeData: any): boolean {
        if(!typeData) { return false; }
        return (typeData.hasOwnProperty("nodeId"));
    }

    public deserialize(projectData: string|object): IProject {

        let project;
        if(typeof projectData === 'string')
        { project = JSON.parse(projectData) as IProject; }
        else
        { project = projectData; }

        for(let nodeGroupIndex=project.nodeGroups.length-1; nodeGroupIndex>=0; nodeGroupIndex--)
        {
            this.processNodeGroup(nodeGroupIndex, project);
        }

        for(let nodeGroupIndex=project.nodeGroups.length-1; nodeGroupIndex>=0; nodeGroupIndex--)
        {
            const nodeGroup = project.nodeGroups[nodeGroupIndex];
            for(let nodeIndex=nodeGroup.nodes.length-1; nodeIndex>=0; nodeIndex--)
            {
                this.processNode(nodeIndex, nodeGroup, project);
            }
        }

        this.afterProcessed(project);

        return project;
    }

    protected processNode(nodeIndex: number, nodeGroup: INodeGroup, project: IProject): void
    {
        const nodeData = nodeGroup.nodes[nodeIndex];
        const nodeEntry = nodeRegistry.getNode(nodeData.type.id);
        const placeholderNode = nodeEntry.nodeFactory.create(nodeData.type.id, null);
        nodeGroup.nodes[nodeIndex] = Object.assign(placeholderNode, nodeData);
    }

    protected processNodeGroup(nodeGroupIndex: number, project: IProject): void
    {
        const nodeGroupData = project.nodeGroups[nodeGroupIndex];
        const nodeGroupEntry = nodeGroupRegistry.getNodeGroup(nodeGroupData.nodeGroupTypeId);
        const placeholderInstance =  nodeGroupEntry.nodeGroupFactory.create(nodeGroupData.nodeGroupTypeId, "");
        project.nodeGroups[nodeGroupIndex] = Object.assign(placeholderInstance, nodeGroupData);
    }

    protected afterProcessed(project: IProject): void {}

    public serialize(project: IProject): string {
        return JSON.stringify(project, this.nodeTypeReplacer, 2);
    }

}