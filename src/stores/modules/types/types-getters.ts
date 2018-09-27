import {TypeData} from "@/models/types/type-data";
import {NamespaceNodeGroup} from "@/models/projects/namespace-node-group";
import {NodeTypeData} from "@/models/types/node-type-data";

export class TypeGetters
{
    public allProjectTypes = (state: any, getters: any, rootState: any, rootGetters: any): Array<TypeData> =>
    {
        if(rootState.project.activeProject == null) { return []; }

        const typeArray: Array<TypeData> = [];
        const activeProject = rootState.project.activeProject;
        activeProject.nodeGroups.forEach((nodeGroup: NamespaceNodeGroup) => {
            if(!nodeGroup){ return; }

           nodeGroup.nodes.forEach(node => {
               const type = new NodeTypeData(node, nodeGroup, { nodeType: node.type.id });
               typeArray.push(type);
           });
        });

        return typeArray;
    }
}