import {INode, INodeGroup, IProject, IProjectSerializer, nodeGroupRegistry, nodeRegistry, projectRegistry} from "@alchemist/core";
import {NodeTypeData} from "../models/types/node-type-data";
import {NamespaceNodeGroup} from "../models/projects/namespace-node-group";
import {ITypeData} from "..";

export class DotNetProjectSerializer implements IProjectSerializer
{
    public nodeTypeReplacer(key: string , value: any) : any
    {
        if(value instanceof NodeTypeData)
        { return (value as NodeTypeData).toTypeData(); }
        return value;
    }

    public getNodeTypeData(project: IProject, typeData: ITypeData): NodeTypeData {

        const nodeId = typeData.metadata[NodeTypeData.ReferencedNodeIdMetdata];
        const nodeGroupName = typeData.metadata[NodeTypeData.ReferencedNodeGroupMetadata];

        const nodeGroup = project.nodeGroups.find(x => x.displayName == nodeGroupName);
        const node = nodeGroup.nodes.find(x => x.id == nodeId);
        return new NodeTypeData(node, nodeGroup as NamespaceNodeGroup, typeData.metadata);
    }

    public hasNodeReferenceMetadata(typeData: ITypeData): boolean {
        if(!typeData) { return false; }
        return typeData.metadata.hasOwnProperty(NodeTypeData.ReferencedNodeIdMetdata);
    }

    public deserialize(projectData: string|object): IProject {

        let project;
        if(typeof projectData === 'string')
        { project = JSON.parse(projectData) as IProject; }
        else
        { project = projectData; }

        project = this.processProject(project);

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

    protected processProject(project: IProject): IProject
    {
        const projectEntry = projectRegistry.getProject(project.projectType);
        const typedProject = projectEntry.projectFactory.create(project.projectType, "", "");
        Object.assign(typedProject, project);
        return typedProject;
    }

    protected processNode(nodeIndex: number, nodeGroup: INodeGroup, project: IProject): void
    {
        const nodeData = nodeGroup.nodes[nodeIndex];
        const nodeEntry = nodeRegistry.getNode(nodeData.type.id);
        const typedNode = nodeEntry.nodeFactory.create(nodeData.type.id, null);
        Object.assign(typedNode, nodeData);
        nodeGroup.nodes[nodeIndex] = typedNode;
    }

    protected processNodeGroup(nodeGroupIndex: number, project: IProject): void
    {
        const nodeGroupData = project.nodeGroups[nodeGroupIndex];
        const nodeGroupEntry = nodeGroupRegistry.getNodeGroup(nodeGroupData.nodeGroupTypeId);
        const typedGroup = nodeGroupEntry.nodeGroupFactory.create(nodeGroupData.nodeGroupTypeId, "");
        Object.assign(typedGroup, nodeGroupData);
        project.nodeGroups[nodeGroupIndex] = typedGroup;
    }

    protected afterProcessed(project: IProject): void {}

    public serialize(project: IProject): string {
        return JSON.stringify(project, this.nodeTypeReplacer, 2);
    }

}